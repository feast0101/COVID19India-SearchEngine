import {connect} from 'react-redux';
import Header from './Header';
import { fetchAssetsBasedOnFilter} from '../../../../actions/library/LibraryAction';

const mapStateToProps = (state, ownProps) => {
  return {
    filters: state.library.allFiltersData,
    filterStatus: state.library.filterStatus,
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

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;