import { userConstants } from '../constants/user.constants';


import setAuthToken from '../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
let initialState = { loggedIn: false, user: {}};

if (localStorage.jwtToken && localStorage.jwtToken !== "undefined") {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
   initialState =  { loggedIn: true, user: decoded};

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    initialState =  { loggedIn: false, user: {}};
  }
}



export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: {}
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.response
            };
        case userConstants.SET_USER:
            return {
                loggedIn: true,
                user: action.decoded
            };
        case userConstants.LOGIN_FAILURE:
            return { loggedIn: false, user: {}};
        case userConstants.LOGOUT:
            return { loggedIn: false, user: {}};
        default:
            return state
    }
}