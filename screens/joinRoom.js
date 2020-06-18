import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import PlayerStatus from './utilities/playerStatus';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        onChangeText={(text) => setRoomName(text)}
        placeholder="enter room"
      />
      <Button title="join" onPress={() => join()} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    margin: 10,
    marginRight: 40,
  },
});
