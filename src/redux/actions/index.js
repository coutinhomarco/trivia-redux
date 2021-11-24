import { fetchAPIGame } from '../../services';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_GAME_QUESTIONS = 'SET_GAME_QUESTIONS';

export const sendToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const sendUserInfo = (payload) => ({
  type: SET_USER_INFO,
  payload,
});

const sendGameQuestions = (payload) => ({
  type: SET_GAME_QUESTIONS,
  payload,
});

export const dispatchGame = () => (dispatch) => fetchAPIGame()
  .then((response) => dispatch(sendGameQuestions(response)));
