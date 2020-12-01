import {connect} from 'react-redux';
import AssetSummary from './AssetSummary';
import {fetchSummary} from '../../../actions/summary/SummaryAction';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.params.id);
  return {
    asset:ownProps.match.params.id,
    isLoading: state.loader.isLoading,
    isError: state.error.isError,
    assetSummary: state.summary.assetSummary
   
  };
};


const mapDispatchToProps = (dispatch,asset) => {
    return {
      fetchSummary: () => {
        dispatch(fetchSummary(asset));
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(AssetSummary);