import { combineReducers } from 'redux';
import login from './login';
import { trivia } from './trivia';

const rootReducer = combineReducers({
  login,
  trivia,
});

export default rootReducer;
