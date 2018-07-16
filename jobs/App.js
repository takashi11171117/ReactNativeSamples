import { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import registerForNotifications from './services/push_notifications';
import configureStore from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: {
        screen: createBottomTabNavigator({
          map: MapScreen,
          deck: DeckScreen,
          review: {
            screen: createStackNavigator({
              review: ReviewScreen,
              settings: SettingsScreen
            })
          }
        },
        {
          navigationOptions: ({ navigation }) => ({
            tabBarLabel: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName == 'review') {
                iconName = "favorite"
              }
              return <Icon name={iconName} size={30} color={tintColor} />;
            },
          }),
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          },
        })
      }
    },
    {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    const { persistor, store } = configureStore();

    return (
      <Provider store={store} style={styles.container}>
        <PersistGate persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
