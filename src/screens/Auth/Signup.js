import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Signup() {
  const [email, setemail] = useState('');
  const [pswd, setpswd] = useState('');
  const navigation = useNavigation();

  const singinwithEmailpswd = () => {
    auth()
      .createUserWithEmailAndPassword(email, pswd)
      .then((res) => {
        console.log('User account created & signed in!', res);
        alert('Registered Succesfully. Please Login.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        } else if (error.code === 'auth/weak-password') {
          alert('Password should be at least 6 characters');
        }

        console.log(error.code);
      });
  };

  const emailValidate = () => {
    if (email.length == 0) {
      alert('Enter Email');
      return false;
    } else {
      return true;
    }
  };

  const pswdValidate = () => {
    if (pswd.length == 0) {
      alert('Enter Password');
      return false;
    } else {
      return true;
    }
  };

  const validate = () => {
    if (emailValidate() && pswdValidate()) {
      singinwithEmailpswd();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Enter Email'}
        value={email}
        style={styles.inputBox}
        onChangeText={(text) => setemail(text)}
      />
      <TextInput
        placeholder={'Password'}
        value={pswd}
        style={styles.inputBox}
        secureTextEntry={true}
        onChangeText={(text) => setpswd(text)}
      />
      <TouchableOpacity
        onPress={() => {
          validate();
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
});
