import { SET_GAME_QUESTIONS } from '../actions';

export const INITIAL_STATE = {};

export const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_GAME_QUESTIONS:
    return ({
      ...state,
      questions: [...action.payload.results],
    });
  default:
    return state;
  }
};
