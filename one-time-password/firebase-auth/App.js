import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBhyoZx3wsVBaVKEIN_c9fT8mYyFfMkajM",
      authDomain: "one-time-password-takashi1117.firebaseapp.com",
      databaseURL: "https://one-time-password-takashi1117.firebaseio.com",
      projectId: "one-time-password-takashi1117",
      storageBucket: "one-time-password-takashi1117.appspot.com",
      messagingSenderId: "84522779996"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
