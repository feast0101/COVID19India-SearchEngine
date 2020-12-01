import {SET_ERROR} from '../../actions/error/ErrorAction';

export default (state = {isError: false}, action) => {
  if (action.type === SET_ERROR) {
    return {...state, isError: action.isError};
  }
  return state;
};