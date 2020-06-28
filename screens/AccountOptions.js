import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../context/UserContext';
//this screen will be to update account settings like displayName and to show current stacks available
const AccountOptions = ({ navigation }) => {
  const [user, loading, error] = useAuthState(db.auth());
  const context = useContext(UserContext);
  const [name, setName] = useState('');

  const updateName = (value) => {
    user.updateProfile({ displayName: value });
  };

  return (
    <View>
      <TextInput
        placeholder="new name!"
        onChangeText={(name) => setName(name)}
      ></TextInput>

      <Button
        title="Update Name!"
        titleStyle={styles.buttonText}
        buttonStyle={styles.highScores}
        onPress={updateName(name)}
      />
      <Button
        title="Logout"
        titleStyle={styles.buttonText}
        buttonStyle={styles.highScores}
        onPress={() => {
          context.setLogout();
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5FDFF',
  },
  header: {
    marginTop: 40,
    marginLeft: 150,
    fontSize: 45,
    color: 'black',
    fontFamily: 'gamejot',
  },
  headerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  buttonGroup: {
    flex: 1,
  },
  play: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
  highScores: {
    backgroundColor: 'darkred',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'gamejot',
  },

  image: {
    height: 300,
    width: 300,
  },
});
export default AccountOptions;
