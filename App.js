// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
// import * as firebase from 'firebase/app';

// // Add the Firebase services that you want to use
// import 'firebase/auth';
// import 'firebase/functions';
// import 'firebase/database';

// import { useObjectVal } from 'react-firebase-hooks/database';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDzCCPQjPzALATf_YOCXSpporWLGPX6OgA',
//   authDomain: 'money-to-burn.firebaseapp.com',
//   databaseURL: 'https://money-to-burn.firebaseio.com',
//   projectId: 'money-to-burn',
//   storageBucket: 'money-to-burn.appspot.com',
//   messagingSenderId: '259957476230',
//   appId: '1:259957476230:web:f7e68b8436ffd6bcbbba07',
//   measurementId: 'G-2JNBJLSCLD',
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var ref = firebase.database().ref();

// export default function App() {
//   const [value, loading, error] = useObjectVal(ref);
//   console.log('value', value);
//   return (
//     <View style={styles.container}>
//       {loading && <Text>Loading</Text>}
//       {value && <Text>{JSON.stringify(value)}</Text>}
//       {/* for not existing */}
//       {value === null && <Text>DNE</Text>}
//       {error && <Text>error</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
