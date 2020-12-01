import React from 'react';
import './SmallAssetSubmission.scss';
import AjaxWrapper from '../../../api/AjaxWrapper';
import Icon_CloseCircle from '../../../assets/images/Icon_CloseCircle.svg';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import { EXTERNAL_ASSETS, PERSON_AUTOSUGGEST} from '../../../config/config';
import Modal from 'react-bootstrap/Modal';
import { SUBMIT_ASSET ,DELETE_ASSET} from '../../../config/config';
import axios, { post } from 'axios';
import Icon_CloseBlackThin from '../../../assets/images/Icon_CloseBlackThin.svg';
import DeleteConfirmation from '../assetsubmission/deleteconfirmation/DeleteConfirmation';


class SmallAssetSubmission extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            allPractices:[],
            owningPractice: [],
            owningPracticeManager: props.data.owningPracticeManager ? props.data.owningPracticeManager : [],
            owningPracticeSearch: props.data.owningPracticeManager && props.data.owningPracticeManager.length > 0 ? ' ' : '',
            owningPracticeManagerError:'',

            assetTeamLeader: props.data.assetTeamLeaderManager && props.data.assetTeamLeaderManager.length > 0 ? ' ' : '',
            assetTeamLeaderManager: props.data.assetTeamLeaderManager ? props.data.assetTeamLeaderManager : [],
            assetTeamLeaderManagerError:'',
            personAutosuggestList_assetTeamLeader: [],

            searchResultDescription: props.data.searchResultDescription ? props.data.searchResultDescription : '',
            assetName:props.data.assetName ? props.data.assetName : '',
            groupEmailAddress:props.data.groupEmailAddress ? props.data.groupEmailAddress : '',
            file:null,
            validated:false,
            assetID: props.data.assetID ? props.data.assetID : '',
            deleteDraft:''


        };
        this.selectedOption = this.selectedOption.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.removeAssetLeaderManager = this.removeAssetLeaderManager.bind(this);
        this.removeOwningPractice = this.removeOwningPractice.bind(this);


    }

    componentWillMount() {

    AjaxWrapper.get('/ksassetbe/getAllPractices').then(res => {
                if (res.apiError) {
                        this.setState({
                            owningPracticeManagerError:"Oops! Something went wrong. Please try again!",
                    });
                } else {
                    this.setState({
                        allPractices: res.response.owningPractice,
                    });
                }

            })

    }

     onSubmit(event) {
            //alert(event);
            const form = event.currentTarget;
            console.log(this.state)

            if (form.checkValidity()) {
                event.preventDefault();
                console.log('form is valid and ready to submit');
                this.submitPage()
            }

            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                this.setState({ mandateFieldErr: true });
                 setTimeout(function() { //Start the timer
                  this.setState({mandateFieldErr: false}) //After 1 second, set render to true
              }.bind(this), 4000)
            }
            this.setState({ validated: true });


        }

    //method to populate practices dropdown
        getOwningPracticeAutoSuggest(event) {

        var newAray = [];
                const queryValue = event.target.value;
                this.setState({ [event.target.name]: queryValue });


            for (var i = 0; i < this.state.allPractices.length; i++) {
                if (this.state.allPractices[i].description.toLowerCase().includes(queryValue.toLowerCase())) {
                    newAray.push(this.state.allPractices[i]);
                }
            }


            this.setState({
                owningPractice: newAray
            })

            if(queryValue === ''){
            this.setState({
                        owningPractice: []
                    })

            }

       // }
        }

            changeHandler(event) {

            this.setState({[event.target.name]: event.target.value})

            }


          selectedOption(option, stepname) {

          if (stepname === 'owningPractice') {
                      if (this.state.owningPracticeManager < 1) {
                          this.setState((prevState) => ({
                              owningPractice: [],
                              owningPracticeSearch: ' ',
                              owningPracticeManager: [...prevState.owningPracticeManager, { description: option.description, id: option.shortName }],
                          }))

                      } else {
                          alert('You can add only one practice');
                          this.setState((prevState) => ({
                              owningPractice: [],
                              owningPracticeSearch: ' ',


                          }));
                      }

                  } else if (stepname === 'FirstAlert') {

                              if (this.state.assetTeamLeaderManager.length <= 1) {

                                 if(this.state.assetTeamLeaderManager.length > 0){

                                              for(var i=0;i<this.state.assetTeamLeaderManager.length;i++){

                                              if(this.state.assetTeamLeaderManager[i].assetTeamContactFullName === option.preferred_name + ' ' + option.last_name){
                                              alert('Already present!')
                                              this.setState({personAutosuggestList_assetTeamLeader:[],assetTeamLeader: ' ',})
                                              break;
                                              }else{
                                              this.setState((prevState) => ({
                                                                  personAutosuggestList_assetTeamLeader: [],
                                                                  assetTeamLeader: ' ',
                                                                  assetTeamLeaderManager: [...prevState.assetTeamLeaderManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status}],
                                                              }))
                                                              break;

                                              }
                                              }


                                              }

                                              else{
                                             this.setState((prevState) => ({
                                                                 personAutosuggestList_assetTeamLeader: [],
                                                                 assetTeamLeader: ' ',
                                                                 assetTeamLeaderManager: [...prevState.assetTeamLeaderManager, {assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status}],
                                                             }))
                                              }

                              } else {
                                  alert('You can add up to two people.');
                                  this.setState((prevState) => ({
                                      personAutosuggestList_assetTeamLeader: [],
                                      assetTeamLeader: ' ',


                                  }));
                              }


                          }


          }


          //method to get the payload for delete api
              getDeleteCallData() {

                  const obj = {
                      assetID: this.state.assetID,
                  };
                  return obj;
              }


                leavePage() {
              this.setState({deleteDraft:true})
                }

          //method to populate AssetTeamLeader autosuggest dropdown
              getPersonAutosuggestListAssetTeamLeader(event) {

                  const queryValue = event.target.value;
                  this.setState({ assetTeamLeader: queryValue });

                  if (queryValue.replace(/\s/g, "").length >= 2) {
                   AjaxWrapper.get(PERSON_AUTOSUGGEST + queryValue).then((res) =>{


                                                          if(res.apiError){

                                                          this.setState({assetTeamLeaderManagerError:"Oops! Something went wrong. Please try again!"})

                                                          }else{
                                                           this.setState({
                                                                              personAutosuggestList_assetTeamLeader: res.response.docs
                                                                          });
                                                          }

                                                          });
                  }else{
                                                              this.setState({personAutosuggestList_assetTeamLeader:[]})
                                                              }

              }

          removeOwningPractice(index) {

                  var newAray = this.state.owningPracticeManager.slice();
                  //delete element by index
                  newAray.splice(index, 1);
                  this.setState({ owningPracticeManager: newAray });
                   if(this.state.owningPracticeManager.length === 1){this.setState({ owningPracticeSearch: '' })}

              }
               removeAssetLeaderManager(index) {
                      var newAray = this.state.assetTeamLeaderManager.slice();
                      //delete element by index
                      newAray.splice(index, 1);
                      this.setState({ assetTeamLeaderManager: newAray });
                      if(this.state.assetTeamLeaderManager.length === 1){this.setState({ assetTeamLeader: '' })}

                  }

              getFinalDataSubmit() {

              if(this.state.file === null){
              this.state.file = new File([""], "dummyLogo.png", {type: 'image/png'});
              }
                      var date = new Date();

                      var lastUpdate = date.getUTCFullYear() + '/' + date.getUTCMonth() + "/" + date.getUTCDate();
                      //var lastUpdate = date.toLocaleDateString("default", {month: "short", year: "numeric", day: "numeric"})


                      const data = new FormData();

                      data.append('file', this.state.file);

                      const obj = {
                          status: "Published",
                          assetType: "small",
                          docType: "nvt:asset",
                          assetID:this.state.assetID,
                          assetName: this.state.assetName,
                          assetTeamLeaderManager: this.state.assetTeamLeaderManager,
                          owningPracticeManager: this.state.owningPracticeManager,
                          assetImageName: 'dummyLogo.png',
                          searchResultDescription:this.state.searchResultDescription,
                          groupEmailAddress:this.state.groupEmailAddress,
                          imageUploaded:false
                      };


                      data.append('docMetadata', new Blob([JSON.stringify(obj)], { type: 'application/json' }));

                      return data;
                  }

                  hide(){
                   window.location = '/ksassetfe/dashboard';
                  }


  submitPage() {

      this.setState({
              errorSubmit: false,
              apiHit:true
            })
      var message = '';
      post(SUBMIT_ASSET,this.getFinalDataSubmit()).then(response => this.setState({
        responseMessage: response.data.message,
        apiHit:false
      })).then((responseMessage) => {
            if (responseMessage !== '') {
                  window.location = '/ksassetfe/dashboard';
                  //window.location.reload();
                }
         }).catch((error) => {
        this.setState({
          errorSubmit: true,
          apiHit:false
        })
   setTimeout(function() { //Start the timer
        this.setState({errorSubmit: false})
    }.bind(this), 2000)
      })

      console.log(this.state.responseMessage)


    }



    render() {

    let deleteClose = () => this.setState({ deleteDraft: false });

        return (
              <Modal dialogClassName="small-asset-modal"
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.openEditModal}
              >
        <div className="div-rectangle">
        {this.state.errorSubmit ? (<div className="error-banner"><span className="alert-icon">&#x26a0;</span>"Oops! Something went wrong. Please try again!"</div>) : ('')}
        {this.state.assetID !== '' ? (
        <div className="row">
        <div className="col-md-11">
        <p className="heading">Edit this asset</p>
        <p className="paragraph">This asset is part of the Know Asset Library, with no dedicated page.  To create a dedicated page, <span><u><a href={`/ksassetfe/assetsubmissionpage?assetID=${this.state.assetID}`} target="_BLANK">expand this into a full asset page.</a></u></span></p>
        </div>
        <div className="col-md-1">
         <img className="close-btn-confirm" src={Icon_CloseBlackThin} onClick={this.props.onHide} alt="" ></img>
        </div>
        </div>


            ) : ( <div className="row">
                         <div className="col-md-11">
                         <p className="heading"><b>Add an asset to my list only</b></p>
                         <p className="paragraph">This asset will be part of the Know Asset Library, with no dedicated page created. To create a dedicated page, please <span><u><a href='/ksassetfe/assetsubmissionpage' target="_BLANK">create a full assest page</a></u></span> instead</p>
                         </div>
                         <div className="col-md-1">
                          <img className="close-btn-confirm" src={Icon_CloseBlackThin} onClick={this.props.onHide} alt="" ></img>
                         </div>
                         </div>)}
            <hr className="line-3"/>
            <Form
                                    noValidate
                                    validated={this.state.validated}
                                    onSubmit={e => this.onSubmit(e)}
                                >
                <p className="field-name" >Asset Name<span className="asterisks">&#42;</span></p>
                <Form.Control className="field-box" id="assetName" placeholder="Type your solution name" name="assetName" value={this.state.assetName} autoComplete="off" onChange={(event) => this.changeHandler(event)} required/>
                <Form.Control.Feedback type="invalid">
                    This field is required
                 </Form.Control.Feedback>

                <p className="field-name"> Asset Leader / First Alert<span className="asterisks">&#42;</span><span className="list-validation">{this.state.assetTeamLeaderManager.length}/2</span></p>
                <Form.Control className="field-box" type="text" name="assetTeamLeader" value={this.state.assetTeamLeader} autoComplete="off" defaultValue="" placeholder="Type and select a colleague's name" onChange={this.getPersonAutosuggestListAssetTeamLeader.bind(this)} required/> <div className="meta-data-group">If no person is selected, a “Group Email” is required.</div>

                                                    {this.state.assetTeamLeaderManagerError.length !== 0 ? (<p className="api-error"> {this.state.assetTeamLeaderManagerError}</p>)
                                                                                                :

                                                    (this.state.personAutosuggestList_assetTeamLeader.length === 0 ? ('') : (
                                                        <p className="autosuggest-para">
                                                            {
                                                                this.state.personAutosuggestList_assetTeamLeader.map(option => (
                                                                    <p onClick={() => this.selectedOption(option, "FirstAlert")} key={option.fmno}> {option.preferred_name + ' ' + option.last_name}</p>

                                                                ))

                                                            }
                                                        </p>)
                                                    )}
                                                    <div className="autosuggest-selected-items">
                                                        {
                                                            this.state.assetTeamLeaderManager.map((manager, index) => (
                                                                <div className="selected-item">
                                                                     <span className="circular"> <img className="image" src={EXTERNAL_ASSETS + "/person/fmno_photos/" + manager.assetTeamContactFmno + "/thumb.jpg?dummy=allowed"} alt="person logo" ></img></span>
                                                                    <span className="name">{manager.assetTeamContactFullName}</span>
                                                                    <img className="close" src={Icon_CloseCircle} alt="Smiley face"  onClick={() => this.removeAssetLeaderManager(index)}></img>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                      {this.state.validated && this.state.groupEmailAddress === '' ? (<Form.Control.Feedback type="invalid">
                                                                                                                                                        This field is required
                                                                                                                                                     </Form.Control.Feedback>) :('')}
                {this.state.assetTeamLeaderManager.length !== 0 ? ('') : (<div>
                <p className="field-name">Group Email Address</p>
                 <Form.Control type="text" className="field-box" id="groupEmailAddress" name="groupEmailAddress" value={this.state.groupEmailAddress}  onChange={(event) => this.changeHandler(event)} autoComplete='off' placeholder="Type or paste your group email address"/></div>
)}
                <p className="field-name">Owning Practice<span className="asterisks">&#42;</span><span className="list-validation">{this.state.owningPracticeManager.length}/1</span></p>
                <Form.Control className="field-box" type="text" name="owningPracticeSearch" value={this.state.owningPracticeSearch} autoComplete="off" defaultValue="" placeholder="Type and select a practice name" onChange={this.getOwningPracticeAutoSuggest.bind(this)} required />
                <Form.Control.Feedback type="invalid">
                                    This field is required
                                 </Form.Control.Feedback>
                {this.state.owningPracticeManagerError.length !== 0 ? (<p className="api-error"> {this.state.owningPracticeManagerError}</p>)  :
                    (this.state.owningPractice.length === 0 ? (<div></div>) : (
                        <p className="autosuggest-para">
                            {
                                this.state.owningPractice.map((option, index) => (
                                    <p onClick={() => this.selectedOption(option, "owningPractice")} key={index}> {option.description}</p>

                                ))

                            }
                        </p>)
                    )}

                    <div className="autosuggest-selected-items">
                        {
                            this.state.owningPracticeManager.map((manager, index) => (
                                <div className="selected-item">
                                    <span className="name">{manager.description}</span>
                                    <img className="close" src={Icon_CloseCircle} alt="person logo" onClick={() => this.removeOwningPractice(index)}></img>

                                </div>
                            ))
                        }
                    </div>
                <p className="field-name-search">Search Result Description<span className="asterisks">&#42;</span><span className="list-validation">{this.state.searchResultDescription.length}/400 characters</span></p>
                <Form.Control rows="3" as="textarea" className="field-box-1" type="text"  name="searchResultDescription" value={this.state.searchResultDescription} maxlength = "400" autoComplete="off"  defaultValue="" placeholder="What do you want to be displayed in search results? " onChange={(event) => this.changeHandler(event)}  required />
                <Form.Control.Feedback type="invalid">
                    This field is required
                 </Form.Control.Feedback>
                <hr className="line-3"/>
                <div className="row">
                    <div className="col-md-9">
                {this.state.assetID === '' ? (<button type="submit" className="add-assest-button" id="addThisAsset" onClick={this.onSubmit.bind(this)}>Add this Asset</button>) : (<button type="submit" className="add-assest-button" id="addThisAsset" onClick={this.onSubmit.bind(this)}>Publish Changes</button>)}
                <button type="button" className="cancel-button" id="cancel" onClick={this.hide.bind(this)}>Cancel</button>
                </div>
                   <div className="col-md-3">
                   {this.state.assetID === '' ? ('') : (<button type="button" className="delete-button" id="cancel" onClick={this.leavePage.bind(this)}>Delete Asset</button>)}
                   </div>
                </div>
            </Form>

             <DeleteConfirmation
                                        show={this.state.deleteDraft}
                                        onHide={deleteClose}
                                        deletepayload={this.getDeleteCallData()}
                                        assetType='small'
                                    />
        </div></Modal>);
    }
}

export default SmallAssetSubmission;