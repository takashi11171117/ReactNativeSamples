import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };
  
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyD_nfTHjffiTDEy_hydgG3l0EGUCFPvHUo',
      authDomain: 'authentication-takashi1117.firebaseapp.com',
      databaseURL: 'https://authentication-takashi1117.firebaseio.com',
      projectId: 'authentication-takashi1117',
      storageBucket: 'authentication-takashi1117.appspot.com',
      messagingSenderId: '455548441405'
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.viewStyle}>
            <Button>
              Log out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View >
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
  marginTop: 10,
  flexDirection: 'row'
  }
 };

export default App;
