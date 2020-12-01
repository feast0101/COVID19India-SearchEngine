import {connect} from 'react-redux';
import Loader from './Loader';

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading
  };
};
/* 
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
 */
export default connect(mapStateToProps, null)(Loader);