import { SET_TOKEN, SET_USER_INFO } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case SET_USER_INFO:
    return {
      ...state,
      name: action.payload.userName,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default login;
