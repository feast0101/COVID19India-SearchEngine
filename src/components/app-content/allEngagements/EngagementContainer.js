import {connect} from 'react-redux';
import AllEngagements from './AllEngagements';
import {fetchEngagements} from '../../../actions/engagements/EngagementAction';

const mapStateToProps = (state, ownProps) => {
  console.log(state.engagement)
  console.log(ownProps.match.params.departmentCode);
  return {
    departmentCode:ownProps.match.params.departmentCode,
    isLoading: state.loader.isLoading,
    isError: state.error.isError,
    allEngagements: state.engagement.allEngagements,
    departmentCode: ownProps.match.params.departmentCode
   
  };
};


const mapDispatchToProps = (dispatch,departmentCode) => {
  return {
        fetchEngagements: (departmentCode) => {
        dispatch(fetchEngagements(departmentCode));
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(AllEngagements);