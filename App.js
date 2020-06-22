import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, Button } from 'react-native-elements';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from './firebaseConfig';

import Home from './screens/home';
import Login from './screens/login';
import GameSelector from './screens/gameSelector';
import WaitingRoom from './screens/waitingRoom';
import JoinRoom from './screens/joinRoom';
import ClikBait from './screens/clikBait';

const Stack = createStackNavigator();


const theme = {
  Button: {
    titleStyle: {
      color: 'red',
    },
    raised: true,
  },
  Text: {
    fontSize: 30,
  }
};

export default function App() {
  const [user, loading, error] = useAuthState(db.auth());

  console.log('home login id', user && user.uid);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameSelector" component={GameSelector} />
          <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
          <Stack.Screen name="JoinRoom" component={JoinRoom} />
          <Stack.Screen name="Login" component={Login} />
          {/* gameListStart */}
          {/* clickBait was labeled ClikBait which broke the app */}
          <Stack.Screen name="clikBait" component={ClikBait} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
