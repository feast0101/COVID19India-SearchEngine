import {connect} from 'react-redux';
import List from './List';
import {fetchAssetsBasedOnFilter} from '../../../../actions/library/LibraryAction';

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading,
    assets: state.library.assets
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAssetsBasedOnFilter: (currentNode, selectedNodes) => {
        dispatch(fetchAssetsBasedOnFilter(currentNode, selectedNodes));
    }
  };
};

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default ListContainer;