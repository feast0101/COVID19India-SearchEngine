import React from 'react';
//import PreviewAsset from './PreviewAsset';
//import './AssetSubmission.scss';
import SmallAssetSubmission from './SmallAssetSubmission';
import AjaxWrapper from '../../../api/AjaxWrapper';
import { EDIT_SUBMISSION} from '../../../config/config';
import Loader from '../../../assets/images/loader.gif';
import queryString from 'query-string';
//import ErrorPopUp from './errorpopup/ErrorPopUp';
//import './errorpopup/ErrorPopUp.scss';


class SmallAssetSubmissionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      editData: {
      },
      loader:true,
      errorMessage:''
    }

    }

componentDidMount() {



     let params = queryString.parse(this.props.location.search)

     if(this.props.location.search === ''){
            this.setState({
             loader:false

      })
     }else{
         AjaxWrapper.get(EDIT_SUBMISSION+params.assetID+'&operation=edit').then((res) => {

         if (res.apiError === 500){
             this.setState({
             errorMessage:'Oops! Something went wrong. Please try again!',
             loader:false
             })
             }else if(res.apiError === 403){
             this.setState({ errorMessage:'You are not authorized to access this module.',
              loader:false})
             }else if(res.apiError === 404){
             console.log(res)
              this.setState({errorMessage:'Not found',
              loader:false})
             }else{
               this.setState({
                editData:res,
                loader:false,
                })
             }
         }

         )
     }


}


  render() {
  console.log(this.props)
  console.log(this.state.errorMessage)

    if(this.state.loader) return <img alt="" src={Loader}/>;
    return (
    this.state.errorMessage === ''  ? (<SmallAssetSubmission data={this.state.editData} openEditModal={true}/>) : (<div className="error-banner"><span className="alert-icon">&#x26a0;</span>Asset summary is not found, please contact know feedback</div>)
);
  }
}

export default SmallAssetSubmissionPage;