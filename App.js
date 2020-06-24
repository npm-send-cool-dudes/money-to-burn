import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from './firebaseConfig';

import Home from './screens/home';
import Login from './screens/login';
import GameSelector from './screens/gameSelector';
import WaitingRoom from './screens/waitingRoom';
import JoinRoom from './screens/joinRoom';
import ClikBait from './screens/clikBait';
import Snek from './screens/games/snek/Snek';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { RotationGestureHandler } from 'react-native-gesture-handler';

const getFonts = () =>
  Font.loadAsync({
    shortstack: require('./assets/fonts/ShortStack-Regular.ttf'),
    hitv: require('./assets/fonts/HiTV.ttf'),
    gamejot: require('./assets/fonts/Gamejot.ttf'),
  });

import AsteroidAdventure from './screens/asteroidAdventure';

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
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, loading, error] = useAuthState(db.auth());

  console.log('home login id', user && user.uid);
  if (!fontsLoaded) {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ ...header, headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="GameSelector"
            options={header}
            component={GameSelector}
          />
          <Stack.Screen
            name="WaitingRoom"
            options={header}
            component={WaitingRoom}
          />
          <Stack.Screen name="JoinRoom" options={header} component={JoinRoom} />
          <Stack.Screen name="Login" options={header} component={Login} />
          {/* gameListStart */}
          {/* clickBait was labeled ClikBait which broke the app */}
          <Stack.Screen name="clikBait" component={ClikBait} options={{ headerShown: false }}/>
          {/* change name when finalized */}
          <Stack.Screen
            name="Asteroid Adventure"
            component={AsteroidAdventure}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="snek" component={Snek} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
