import { withAuthenticator } from '@aws-amplify/ui-react'
import axios from 'axios';
import { Router } from "@reach/router"

import { Homepage } from './Homepage/Homepage';
import { NewItem } from './NewItem/NewItem';
import { Habits } from './Habits/Habits';

axios.interceptors.request.use(config => {
  const authTokenKeyVal = Object.entries(localStorage)
    .filter(([key, val]) => {
      return key.includes('CognitoIdentityServiceProvider') && key.includes('accessToken')
    })
  const authToken = authTokenKeyVal.length ? authTokenKeyVal[0][1] : '';
  config.headers.Authentication = `Bearer ${authToken}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

function App() {
  return (
    <Router>
      <Homepage path="/" />
      <NewItem path="/new-item" />
      <Habits path="/habits" />
    </Router>
  );
}

export default withAuthenticator(App)
