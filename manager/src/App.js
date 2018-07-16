import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCY0sw25vgbrpuVzsr4OfVqFys_FE1xh9Q',
      authDomain: 'manager-takashi1117.firebaseapp.com',
      databaseURL: 'https://manager-takashi1117.firebaseio.com',
      projectId: 'manager-takashi1117',
      storageBucket: 'manager-takashi1117.appspot.com',
      messagingSenderId: '72878087776'
    };

    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}

export default App;
