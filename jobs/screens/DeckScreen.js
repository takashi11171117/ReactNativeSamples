import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/MaterialIcons';
import striptags from 'striptags';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

Geocoder.init('AIzaSyDikE4dohMsaG4OLveeJkij2bIkwGjw2GY');

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
        return <Icon name="description" size={30} color={tintColor} />;
        }
    });
    
  renderCard(job) {
    let latitude, longitude = null;
    try {
      Geocoder.getFromLocation(job.location).then(
        json => {
          var location = json.results[0].geometry.location;
          latitude = parseFloat(location.lat).toFixed(4);
          longitude = parseFloat(location.lng).toFixed(4);
          
          console.log(latitude, longitude);
        },
        error => {
          console.error(error);
          longitude = 0.107760;
          latitude = 52.205067;
        }
      );
    } catch (err) {
      console.log(err);
    }

    const initialRegion = {
      longitude: longitude ? longitude : -122,
      latitude: latitude ? latitude : 37,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.created_at}</Text>
        </View>
        <Text>
          {striptags(job.description).substr(0, 100)}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);