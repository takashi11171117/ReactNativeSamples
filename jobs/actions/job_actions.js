import axios from 'axios';
import qs from 'qs';
import Geocoder from 'react-native-geocoding';
import _ from 'lodash';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';
const JOB_QUERY_PARAMS = {
  // description: 'javascript'
 };

Geocoder.init('AIzaSyDikE4dohMsaG4OLveeJkij2bIkwGjw2GY');

const buildJobsLocation = async ({ latitude, longitude }) => {
  const lat = parseFloat(latitude).toFixed(2);
  const long = parseFloat(longitude).toFixed(2);
  return await Geocoder.getFromLatLng(lat, long).then(
  json => {
  let address_component = json.results[0].address_components[3]; 
  return address_component.long_name; 
  },
  error => {
  console.log(error);
  }
  );
};

const buildJobsUrl = (region, postal_town) => {
  const { latitude, longitude } = region;
  let query;
  if (!postal_town) {
  query = qs.stringify({ ...JOB_QUERY_PARAMS, lat: latitude, long: longitude });
  } else {
  query = qs.stringify({ ...JOB_QUERY_PARAMS, location: postal_town });
  }
  return `${JOB_ROOT_URL}${query}`;
 };

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    const postal_town = await buildJobsLocation(region);
    const url = buildJobsUrl(region, postal_town);
    console.log('url', url);
    let { data } = await axios.get(url);
    console.log(data);
    dispatch({ type: FETCH_JOBS, payload: data.slice(0, 10) });
    callback();
  } catch (err) {
    console.error(e);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};