import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { RotationGestureHandler } from 'react-native-gesture-handler';

import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from './firebaseConfig';

import {
  Home,
  Login,
  GameSelector,
  WaitingRoom,
  JoinRoom,
  AccountOptions,
} from './screens';
import { ClikBait, Snek, AsteroidAdventure } from './screens/games';
import { UserContext } from './context/UserContext';

const getFonts = () =>
  Font.loadAsync({
    shortstack: require('./assets/fonts/ShortStack-Regular.ttf'),
    hitv: require('./assets/fonts/HiTV.ttf'),
    gamejot: require('./assets/fonts/Gamejot.ttf'),
  });

const Stack = createStackNavigator();

const theme = {
  Button: {
    raised: false,
    containerStyle: { margin: 5 },
  },
};

const header = {
  headerTransparent: true,
  headerTitleStyle: { fontFamily: 'gamejot' },
  headerTintColor: 'darkgray',
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, loading, error] = useAuthState(db.auth());
  const [loggedIn, setLoggedIn] = useState(false);

  const setLogIn = () => {
    setLoggedIn(true);
  };
  const setLogout = () => {
    setLoggedIn(false);
  };

  user && console.log('home login id', user && user.uid);
  if (!fontsLoaded) {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
  return (
    <UserContext.Provider value={{ loggedIn, setLogIn, setLogout }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {!loggedIn ? (
              <Stack.Screen name="Login" options={header} component={Login} />
            ) : (
              <Stack.Screen
                name="Home"
                options={{ ...header, headerShown: false }}
                component={Home}
              />
            )}
            <Stack.Screen
              name="AccountOptions"
              // options={{ ...header, headerShown: false }}
              component={AccountOptions}
            />
            <Stack.Screen
              name="GameSelector"
              options={{ ...header, title: 'Game Selector' }}
              component={GameSelector}
            />
            <Stack.Screen
              name="WaitingRoom"
              options={{ ...header, title: 'Waiting Room' }}
              component={WaitingRoom}
            />
            <Stack.Screen
              name="JoinRoom"
              options={{ ...header, title: 'Join Room' }}
              component={JoinRoom}
            />
            {/* gameListStart */}
            {/* clickBait was labeled ClikBait which broke the app */}
            <Stack.Screen
              name="clikBait"
              component={ClikBait}
              options={{ headerShown: false }}
            />
            {/* change name when finalized */}
            <Stack.Screen
              name="Asteroid Adventure"
              component={AsteroidAdventure}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="snek"
              component={Snek}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
