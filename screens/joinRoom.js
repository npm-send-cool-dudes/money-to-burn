import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import PlayerStatus from './utilities/playerStatus';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const QRcode = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  width: 200,
  height: 200,
};

export default function JoinRoom({ navigation }) {
  const [user, loading, error] = useAuthState(db.auth());
  const [roomName, setRoomName] = useState('');
  let [roomList] = useObjectVal(db.database().ref(`/Rooms/`));

  function join() {
    console.log('roomlist', roomList);
    if (!roomList[roomName]) {
      Alert.alert('Room not found');
      console.log('Room not found');
    } else {
      //fuxed this prop being named incorrectly
      navigation.navigate('WaitingRoom', { roomName: roomName });
    }
  }

  return (
    <View style={styles.background}>
      <Input
        containerStyle={{ width: 140 }}
        inputStyle={{ fontFamily: 'shortstack', fontSize: 30, width: 100 }}
        placeholder="Room"
        leftIcon={{ type: 'font-awesome', name: 'fire' }}
        onChangeText={(value) => setRoomName(value)}
      />
      <Button
        title="Join"
        titleStyle={styles.buttonText}
        buttonStyle={styles.button}
        onPress={() => join()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5FDFF',
  },
  button: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'gamejot',
  },
});
