import { withAuthenticator } from '@aws-amplify/ui-react'
import axios from 'axios';
import { Router } from "@reach/router"

import { Homepage } from './Homepage/Homepage';
import { NewItem } from './NewItem/NewItem';

axios.interceptors.request.use(config => {
  const authTokenKeyVal = Object.entries(localStorage)
    .filter(([key, val]) => {
      return key.includes('CognitoIdentityServiceProvider') && key.includes('accessToken')
    })
  const authToken = authTokenKeyVal.length ? authTokenKeyVal[0][1] : '';
  config.headers.Authentiation = `Bearer ${authToken}`;
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
    </Router>
  );
}

export default withAuthenticator(App)
