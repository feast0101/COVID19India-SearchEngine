import {connect} from 'react-redux';
import Library from './Library';
import queryString from 'query-string';
import {fetchAllAssets, fetchAssetsBasedOnFilter, fetchAllFilters} from '../../../actions/library/LibraryAction';
const mapStateToProps = (state, ownProps) => {
  let location = queryString.parse(ownProps.location.search)
  return {
    isError: state.error.isError,
    passedFilters: location
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllFilters: () => {
      return dispatch(fetchAllFilters());
    },
    fetchAllAssets: () => {
      dispatch(fetchAllAssets());
    },
    fetchAssetsBasedOnFilter: (currentNode, selectedNodes) => {
        dispatch(fetchAssetsBasedOnFilter(currentNode, selectedNodes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);