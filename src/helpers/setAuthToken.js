import api from './api';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    api.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete api.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;