import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from './firebaseConfig';

import Home from './screens/home';
import Login from './screens/login';
import GameSelector from './screens/gameSelector';
import WaitingRoom from './screens/waitingRoom';
import JoinRoom from './screens/joinRoom';
import ClikBait from './screens/clikBait';

import RonGame from './screens/ronGame';
import Timer from './screens/utilities/timer';

const Stack = createStackNavigator();

export default function App() {
  const [user, loading, error] = useAuthState(db.auth());

  console.log('home login id', user && user.uid);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Timer" component={Timer} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameSelector" component={GameSelector} />
          <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
          <Stack.Screen name="JoinRoom" component={JoinRoom} />
          <Stack.Screen name="Login" component={Login} />
          {/* gameListStart */}
          {/* clickBait was labeled ClikBait which broke the app */}
          <Stack.Screen name="clikBait" component={ClikBait} />

          {/* change name when finalized */}
          <Stack.Screen
            name="fzero"
            component={RonGame}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
