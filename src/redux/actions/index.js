export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_INFO = 'SET_USER_INFO';

export const sendToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const sendUserInfo = (payload) => ({
  type: SET_USER_INFO,
  payload,
});
