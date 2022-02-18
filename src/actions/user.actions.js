import { userConstants } from '../constants/user.constants';
export const registerUserAction = (user) => {
    return {
      type: userConstants.REGISTER_REQUEST,
      user
    }
  };
  export const loginUserAction = (user) => {
    return {
      type: userConstants.LOGIN_REQUEST,
      user
    }
  };


