import { actionNames } from './actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionNames.FETCH_DATA:
      return action.payload;
    default:
      return state;
  }
};