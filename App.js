import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from './firebaseConfig';

import Home from './screens/home';
import Login from './screens/login';
import GameSelector from './screens/gameSelector';
import ClikBait from './screens/clikBait';
import WaitingRoom from './screens/waitingRoom';
import JoinRoom from './screens/joinRoom';

const Stack = createStackNavigator();

export default function App() {
  const [count, setCount] = useState(0);
  const [user, loading, error] = useAuthState(db.auth());

  console.log('home login id', user && user.uid);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameSelector" component={GameSelector} />
          <Stack.Screen name="ClikBait" component={ClikBait} />
          <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="JoinRoom" component={JoinRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
