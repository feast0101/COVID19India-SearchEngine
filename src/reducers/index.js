import {combineReducers} from 'redux';
import library from './library/LibraryReducer';
import loader from './loader/LoaderReducer';
import error from './error/ErrorReducer';
import summary from './summary/SummaryReducer';
import engagement from './engagements/EngagementReducer'

export default combineReducers({
   library,
   loader,
   error,
   summary,
   engagement
});