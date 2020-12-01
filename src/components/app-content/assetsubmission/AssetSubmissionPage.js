import React from 'react';
import PreviewAsset from './PreviewAsset';
//import './AssetSubmission.scss';
import AssetSubmission from './AssetSubmission';
import AjaxWrapper from '../../../api/AjaxWrapper';
import { EDIT_SUBMISSION} from '../../../config/config';
import Loader from '../../../assets/images/loader.gif';
import queryString from 'query-string';
import ErrorPopUp from './errorpopup/ErrorPopUp';
import './errorpopup/ErrorPopUp.scss';


class AssetSubmissionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      submissionData: {
      },
      editCall:false,
      loader:true,
      openErrorPopUp:false
    }

    this.onPreview = this.onPreview.bind(this);
    this.onClosePreview = this.onClosePreview.bind(this);
  }

//componentWillMount() {
//   this.setState({
//            loader:true
//        })
//}

componentDidMount() {



     let params = queryString.parse(this.props.location.search)

     if(this.props.location.search === ''){
            this.setState({
             editCall:false,
             loader:false

      })
     }else{
         AjaxWrapper.get(EDIT_SUBMISSION+params.assetID+'&operation=edit').then((res) => {

         if (res.apiError === 500){
             this.setState({
             errorMessage:'Oops! Something went wrong. Please try again!',
             openErrorPopUp:true,
             loader:false
             })
             }else if(res.apiError === 403){
             this.setState({ errorMessage:'You are not authorized to access this module.',
              openErrorPopUp:true,loader:false})
             }else if(res.apiError === 404){
             console.log(res)
              this.setState({errorMessage:'Not found',
              openErrorPopUp:true,loader:false})
             }else{
               this.setState({
                            submissionData:res,
                            editCall:true,
                            loader:false
                })
             }
         }

         )
     }


}

  onPreview(data) {
    this.setState({ showPreview: true, submissionData: data });
  }

  onClosePreview() {
    this.setState({ showPreview: false });
  }

  render() {
    let closeErrorPopUp = () => this.setState({ openErrorPopUp: false })

   /* if(this.state.openErrorPopUp) return(<div>
                                  <ErrorPopUp
                                                  show={this.state.openErrorPopUp}
                                                  errorMessage={this.state.errorMessage}
                                              />
                                              </div>);*/
        if(this.state.openErrorPopUp) return (<div className="error-banner"><span className="alert-icon">&#x26a0;</span>Asset summary is not found, please contact know feedback</div>)
    if(this.state.loader) return <img alt="" src={Loader}/>;
    return (

        this.state.showPreview
              ? <PreviewAsset closeCallback={this.onClosePreview} data={this.state.submissionData} editCall={this.state.editCall}/>
              : <AssetSubmission previewCallback={this.onPreview} data={this.state.submissionData} editCall={this.state.editCall}/>
    );
  }
}

export default AssetSubmissionPage;