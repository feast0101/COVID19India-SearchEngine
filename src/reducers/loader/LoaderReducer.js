import {SET_LOADER} from '../../actions/loader/LoaderAction';

export default (state = {isLoading: false}, action) => {
  if (action.type === SET_LOADER) {
    return {...state, isLoading: action.payload};
  }
  return state;
};