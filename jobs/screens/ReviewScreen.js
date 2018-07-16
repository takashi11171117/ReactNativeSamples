import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyDikE4dohMsaG4OLveeJkij2bIkwGjw2GY');

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => { navigation.navigate('settings'); }}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    headerStyle: {marginTop: Platform.OS === 'android' ? 20 : 0}
  });

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        company, created_at, url,
        title, id
      } = job;

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
        <Card title={title} key={id}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{created_at}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);