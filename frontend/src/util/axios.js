import axios from 'axios';

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

export const axiosWrapper = axios;