import React, { Fragment } from 'react';
import ReactDOM from "react-dom";
import './AssetSubmission.scss';
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer';
import ErrorSubmit from './errorsubmit/ErrorSubmit';
import DraftSubmit from './draftsubmit/DraftSubmit';
import SideNav from './sidenav/SideNav';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import ReactTooltip from 'react-tooltip';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { EXTERNAL_ASSETS, PERSON_AUTOSUGGEST, PRACTICE_AUTOSUGGEST, KNOWID_AUTOSUGGEST, VALIDATE_DEPARTMENT_CODE, KNOW_NOW_VIDEO, SAVE_ASSET ,PERSON_PROFILE} from '../../../config/config';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AjaxWrapper from '../../../api/AjaxWrapper';
import DeleteConfirmation from './deleteconfirmation/DeleteConfirmation';
import CancelConfirmation from './cancelconfirmation/CancelConfirmation';
import Confirmation from './confirmation/Confirmation';
import ImageUpload from './imageupload/ImageUpload';
import SummaryBox from './texteditor/TextEditor';
import axios, { post } from 'axios';
import Icon_CloseCircle from '../../../assets/images/Icon_CloseCircle.svg';
import Mckinsey_Header_Logo from '../../../assets/images/McK_ScriptMark_RGB_McKDeepBlue.svg';
class Assetsubmission extends React.Component {



    constructor(props) {
        super(props);
    this.refA = React.createRef()
    this.refB = React.createRef()
    this.refC = React.createRef()
    this.refD = React.createRef()
    this.refE = React.createRef()
    this.refF = React.createRef()
    this.refF = React.createRef()
    this.refSubmit = React.createRef()

        this.state = {

            assetID: props.data.assetID ? props.data.assetID : '',
            assetNodeRef: props.data.assetNodeRef ? props.data.assetNodeRef : '',
            assetName: props.data.assetName ? props.data.assetName : '',


            assetDepartmentCode: [],
            assetDepartmentCodeManager: props.data.assetDepartmentCodeManager ? props.data.assetDepartmentCodeManager : [],
            assetDepartmentCodeSearch: props.data.assetDepartmentCodeManager && props.data.assetDepartmentCodeManager.length > 0 ? ' ' : '',
            assetDepartmentCodeResponse: null,
            assetDepartmentCodeError: '',

            owningPractice: [],
            owningPracticeManager: props.data.owningPracticeManager ? props.data.owningPracticeManager : [],
            owningPracticeSearch: props.data.owningPracticeManager && props.data.owningPracticeManager.length > 0 ? ' ' : '',
            owningPracticeManagerError:'',


            otherOwningPractice: [],
            otherOwningPracticeManager: props.data.otherOwningPracticeManager ? props.data.otherOwningPracticeManager : [],
            otherOwningPracticeSearch: props.data.otherOwningPracticeManager && props.data.otherOwningPracticeManager.length > 0 ? ' ' : '',
            otherOwningPracticeManagerError:'',



            assetDescription: props.data.assetDescription ? props.data.assetDescription : '',
            searchResultDescription: props.data.searchResultDescription ? props.data.searchResultDescription : '',
            useCases: props.data.useCases ? props.data.useCases : [{ assetUseCaseTitle: "", assetUseCaseDesc: "" }],




            timeline: props.data.timeline ? props.data.timeline : '',
            resourcing: props.data.resourcing ? props.data.resourcing : '',
            cost: props.data.cost ? props.data.cost : '',
            technologyDescription: props.data.technologyDescription ? props.data.technologyDescription : '',
            assetWebsite: props.data.assetWebsite ? props.data.assetWebsite : '',
            assetEmailAddress: props.data.assetEmailAddress ? props.data.assetEmailAddress : '',
            practiceManagerSearch: props.data.practiceManager && props.data.practiceManager.length > 0 ? ' ' : '',
            practiceManager: props.data.practiceManager ? props.data.practiceManager : [],
            personAutosuggestList: [],
            practiceManagerError:'',
            serviceLine: props.data.serviceLineManager && props.data.serviceLineManager.length > 0 ? ' ' : '',
            serviceLineManager: props.data.serviceLineManager ? props.data.serviceLineManager : [],
            personAutosuggestList_serviceLine: [],
            serviceLineManagerError:'',
            expert:props.data.expertManager && props.data.expertManager.length > 0 ? ' ' : '',
            expertManager: props.data.expertManager ? props.data.expertManager : [],
            personAutosuggestList_expert: [],
            expertManagerError:'',
            researchTeam:props.data.researchTeamManager && props.data.researchTeamManager.length > 0 ? ' ' : '',
            researchTeamManager: props.data.researchTeamManager ? props.data.researchTeamManager : [],
            researchTeamManagerError:'',
            personAutosuggestList_researchTeam: [],
            assetTeamLeader: props.data.assetTeamLeaderManager && props.data.assetTeamLeaderManager.length > 0 ? ' ' : '',
            assetTeamLeaderManager: props.data.assetTeamLeaderManager ? props.data.assetTeamLeaderManager : [],
            assetTeamLeaderManagerError:'',
            personAutosuggestList_assetTeamLeader: [],
            validated: props.data.validated ? props.data.validated : false,
            showDraft: props.data.showDraft ? props.data.showDraft : false,

            lopPages: [],
            lopPagesManager: props.data.lopPagesManager ? props.data.lopPagesManager : [],
            lopPagesSearch: props.data.lopPagesManager && props.data.lopPagesManager.length > 0 ? ' ' : '',
            lopresponse: props.data.lopresponse ? props.data.lopresponse : null,
            lopresponseError: '',



            clientImpactCasesSearch: props.data.clientImpactCasesManager && props.data.clientImpactCasesManager.length > 0 ? ' ' : '',
            clientImpactCases: [],
            clientImpactCasesManager: props.data.clientImpactCasesManager ? props.data.clientImpactCasesManager : [],
            clientImpactCasesResponse: props.data.clientImpactCasesResponse ? props.data.clientImpactCasesResponse : null,
            clientImpactCasesManagerError:'',

            sampleOutputs: [],
            sampleOutputsSearch: props.data.sampleOutputsManager && props.data.sampleOutputsManager.length > 0 ? ' ' : '',
            sampleOutputsManager: props.data.sampleOutputsManager ? props.data.sampleOutputsManager : [],
            sampleOutputsResponse: props.data.sampleOutputsResponse ? props.data.sampleOutputsResponse : null,
            sampleOutputsManagerError:'',

            emGuideSearch: props.data.emGuideManager && props.data.emGuideManager.length > 0 ? ' ' : '',
            emGuide: [],
            emGuideManager: props.data.emGuideManager ? props.data.emGuideManager : [],
            emGuideManagerError:'',
            emGuideResponse: props.data.emGuideResponse ? props.data.emGuideResponse : null,


            demoVideoSearch: '',
            demoVideo: [],
            demoVideoManager: props.data.demoVideoManager ? props.data.demoVideoManager : [],
            demoVideoManagerError:'',
            demoVideoResponse: null,
            demoVideoError: '',

            deleteDraft: props.data.deleteDraft ? props.data.deleteDraft : false,
            cancelForm: false,
            confirmPopUp: false,
            file: props.data.file ? props.data.file : null,
            imageName: props.data.imageName ? props.data.imageName : 'dummyLogo.png',
            base64URl: props.data.base64URl ? props.data.base64URl : '',
            uploadingFile: false,

            showPreview: false,

            internalContactParentList: props.data.internalContactParentList ? props.data.internalContactParentList : [],

            typing: false,
            typingTimeout: 0,
            allPractices: [],
            errorSubmit:'',
            mandateFieldErr:false,
            imageUploaded:false


        }

        this.addUseCaseButton = this.addUseCaseButton.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeHandlerEditor = this.changeHandlerEditor.bind(this);
        this.handleUseCase = this.handleUseCase.bind(this);
        this.handleUseCaseDesc = this.handleUseCaseDesc.bind(this);
        this.getPersonAutosuggestList = this.getPersonAutosuggestList.bind(this);
        this.getPersonAutosuggestListServiceLine = this.getPersonAutosuggestListServiceLine.bind(this);
        this.getPersonAutosuggestListExpert = this.getPersonAutosuggestListExpert.bind(this);
        this.getPersonAutosuggestListResearchTeam = this.getPersonAutosuggestListResearchTeam.bind(this);
        this.selectedOption = this.selectedOption.bind(this);
        this.removePracticeManager = this.removePracticeManager.bind(this);
        this.getPersonAutosuggestListAssetTeamLeader = this.getPersonAutosuggestListAssetTeamLeader.bind(this);
        this.onSaveDraft = this.onSaveDraft.bind(this);

    }

//method to get the payload for submit api
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
            assetType: "large",
            docType: "nvt:asset",
            assetID: this.state.assetID,
            assetName: this.state.assetName,
            assetDepartmentCodeManager: this.state.assetDepartmentCodeManager,
            assetDescription: this.state.assetDescription.replace(/(<([^>]+)>)/ig, ''),
            assetEmailAddress: this.state.assetEmailAddress,
            assetTeamLeaderManager: this.state.assetTeamLeaderManager,
            assetWebsite: this.state.assetWebsite,
            clientImpactCasesManager: this.state.clientImpactCasesManager,
            cost: this.state.cost.replace(/(<([^>]+)>)/ig, ''),
            demoVideoManager: this.state.demoVideoManager,
            emGuideManager: this.state.emGuideManager,
            expertManager: this.state.expertManager,
            lopPagesManager: this.state.lopPagesManager,
            otherOwningPracticeManager: this.state.otherOwningPracticeManager,
            owningPracticeManager: this.state.owningPracticeManager,
            practiceManager: this.state.practiceManager,
            researchTeamManager: this.state.researchTeamManager,
            resourcing: this.state.resourcing.replace(/(<([^>]+)>)/ig, ''),
            sampleOutputsManager: this.state.sampleOutputsManager,
            searchResultDescription: this.state.searchResultDescription,
            serviceLineManager: this.state.serviceLineManager,
            technologyDescription: this.state.technologyDescription.replace(/(<([^>]+)>)/ig, ''),
            timeline: this.state.timeline.replace(/(<([^>]+)>)/ig, ''),
            useCases: this.state.useCases,
            base64URl: this.state.base64URl,
            lastUpdate: lastUpdate,
            assetImageName: this.state.imageName,
            imageUploaded:this.state.imageUploaded
        };


        data.append('docMetadata', new Blob([JSON.stringify(obj)], { type: 'application/json' }));


        return data;
    }

//method to get the payload for save draft api
    getSaveDraftData() {
if(this.state.file === null){
this.state.file = new File([""], "dummyLogo.png", {type: 'image/png'});
}
        var date = new Date();
        var lastUpdate = date.getUTCFullYear() + '/' + date.getUTCMonth()+1 + "/" + date.getUTCDate();

        const data = new FormData();

        data.append('file', this.state.file);

        const obj = {
            status: "Draft",
            assetType: "large",
            docType: "nvt:asset",
            assetID: this.state.assetID,
            assetName: this.state.assetName,
            assetDepartmentCodeManager: this.state.assetDepartmentCodeManager,
            assetDescription: this.state.assetDescription.replace(/(<([^>]+)>)/ig, ''),
            assetEmailAddress: this.state.assetEmailAddress,
            assetTeamLeaderManager: this.state.assetTeamLeaderManager,
            assetWebsite: this.state.assetWebsite,
            clientImpactCasesManager: this.state.clientImpactCasesManager,
            cost: this.state.cost.replace(/(<([^>]+)>)/ig, ''),
            demoVideoManager: this.state.demoVideoManager,
            emGuideManager: this.state.emGuideManager,
            expertManager: this.state.expertManager,
            lopPagesManager: this.state.lopPagesManager,
            otherOwningPracticeManager: this.state.otherOwningPracticeManager,
            owningPracticeManager: this.state.owningPracticeManager,
            practiceManager: this.state.practiceManager,
            researchTeamManager: this.state.researchTeamManager,
            resourcing: this.state.resourcing.replace(/(<([^>]+)>)/ig, ''),
            sampleOutputsManager: this.state.sampleOutputsManager,
            searchResultDescription: this.state.searchResultDescription,
            serviceLineManager: this.state.serviceLineManager,
            technologyDescription: this.state.technologyDescription.replace(/(<([^>]+)>)/ig, ''),
            timeline: this.state.timeline.replace(/(<([^>]+)>)/ig, ''),
            useCases: this.state.useCases,
            base64URl: this.state.base64URl,
            lastUpdate: lastUpdate,
            assetImageName: this.state.imageName,
            imageUploaded:this.state.imageUploaded
        };


        data.append('docMetadata', new Blob([JSON.stringify(obj)], { type: 'application/json' }));


        return data;

    }

//method to get the payload for delete api
    getDeleteCallData() {

        const obj = {
            assetID: this.state.assetID,
        };
        return obj;
    }

//method to get the data for preview screen,this data will go to parent class
    getFinalDataPreview() {

        var date = new Date();
        //var lastUpdate = date.getUTCFullYear() + '/' + date.getUTCMonth()+1 + "/" + date.getUTCDate();
        var lastUpdate = date.toLocaleDateString("default", {month: "short", year: "numeric", day: "numeric"})

        const obj = {
            assetID: this.state.assetID,
            assetName: this.state.assetName,
            assetDepartmentCodeManager: this.state.assetDepartmentCodeManager,
            assetDescription: this.state.assetDescription,
            assetEmailAddress: this.state.assetEmailAddress,
            assetTeamLeaderManager: this.state.assetTeamLeaderManager,
            assetWebsite: this.state.assetWebsite,
            clientImpactCasesManager: this.state.clientImpactCasesManager,
            cost: this.state.cost,
            demoVideoManager: this.state.demoVideoManager,
            emGuideManager: this.state.emGuideManager,
            expertManager: this.state.expertManager,
            file: this.state.file,
            lopPagesManager: this.state.lopPagesManager,
            otherOwningPracticeManager: this.state.otherOwningPracticeManager,
            owningPracticeManager: this.state.owningPracticeManager,
            practiceManager: this.state.practiceManager,
            researchTeamManager: this.state.researchTeamManager,
            resourcing: this.state.resourcing,
            sampleOutputsManager: this.state.sampleOutputsManager,
            searchResultDescription: this.state.searchResultDescription,
            serviceLineManager: this.state.serviceLineManager,
            technologyDescription: this.state.technologyDescription,
            timeline: this.state.timeline,
            useCases: this.state.useCases,
            lopresponse: this.state.lopresponse,
            clientImpactCasesResponse: this.state.clientImpactCasesResponse,
            sampleOutputsResponse: this.state.sampleOutputsResponse,
            emGuideResponse: this.state.emGuideResponse,
            demoVideoResponse:this.state.demoVideoResponse,
            lastUpdate: lastUpdate,
            internalContactParentList: this.state.internalContactParentList,
            base64URl: this.state.base64URl,
            assetImageName: this.state.imageName,
            lopPagesSearch:this.state.lopPagesSearch,
            clientImpactCasesSearch:this.state.clientImpactCasesSearch,
            sampleOutputsSearch:this.state.sampleOutputsSearch,
            emGuideSearch:this.state.emGuideSearch,
            demoVideoSearch:this.state.demoVideoSearch,
            deleteDraft:this.state.deleteDraft,
            assetDepartmentCodeResponse:this.state.assetDepartmentCodeResponse,
            assetTeamLeader:this.state.assetTeamLeader,
            practiceManagerSearch:this.state.practiceManagerSearch,
            serviceLine:this.state.serviceLine,
            expert:this.state.expert,
            researchTeam:this.state.researchTeam,
            owningPracticeSearch:this.state.owningPracticeSearch,
            otherOwningPracticeSearch:this.state.otherOwningPracticeSearch,


        }

        return obj;
    }

//change the title of the page
    componentDidMount() {

//     var banner = document.getElementById("legacy-knowTab");
//        banner.style.display = "none";
        document.title = "Asset Submission"
    }

//method to call the save draft api
    saveData(data) {
        //now after getting the response set asset Id from response to maintain state of edit page call
        post(SAVE_ASSET, data).then(response => this.setState({
                                    assetID: response.data.assetId,
                                    assetNodeRef:response.data.nodeRef,

                                  })).then((assetID) => {
                                        if (this.state.assetID !== '') {
                                        this.setState({
                                        showDraft: true,
                                        })
                                         setTimeout(function() { //Start the timer
                                              this.setState({showDraft: false}) //After 1 second, set render to true
                                          }.bind(this), 4000)
                                            }
                                     }).catch((error) => {
                                    this.setState({
                                      errorSubmit: true,

                                    })
                                    setTimeout(function() { //Start the timer
                                                                                  this.setState({errorSubmit: false}) //After 1 second, set render to true
                                                                              }.bind(this), 2000)

                                  });
    }

//method to handle tinymc editor
    changeHandlerEditor(id, value) {

        if (id === "counttxt-techdescription") {

        this.setState({

                                                                                technologyDescription: value,

                                                                            })


            console.log(this.state.technologyDescription + 'technologyDescription')

        }

        if (id === "counttxt-cost") {

        this.setState({

                                                               cost: value,
                                                               isCostEmpty:false

                                                           })

            //console.log(this.state.cost)
        }

        if (id === "counttxt-resourcing") {

       this.setState({

                                                                       resourcing: value,
                                                                       isResourcingEmpty:false

                                                                   })
            //console.log(this.state.resourcing)
        }

        if (id === "counttxt-timeline") {

         this.setState({

                                                                               timeline: value,
                                                                               isTimelineEmpty:false

                                                                           })

            //console.log(this.state.timeline)
        }

        if (id === "counttxt-assetDescription") {


        this.setState({

                        assetDescription: value,
                        isAssetDescEmpty:false

                    });

        }
    }

//method to handle normal input field
    changeHandler(event) {

    this.setState({

                                                                      [event.target.name]: event.target.value

                                                                  })

    }

//method to handle normal input field
    handleUseCase(event, index) {

        let step = event.target.name;
        let value = event.target.value;

        console.log(step);
        console.log(value);
        if(step === 'assetUseCaseTitle'){if(this.state.useCases[index][step].length < 50){this.setState((prevState) => {
                                                                                             const useCases = [...prevState.useCases];
                                                                                             useCases[index][step] = value;
                                                                                             return {
                                                                                                 useCases
                                                                                             };
                                                                                         });
                                }}
                                /*else{
                                if(this.state.useCases[index][step].length < 300){this.setState((prevState) => {
                                                                                                                             const useCases = [...prevState.useCases];
                                                                                                                             useCases[index][step] = value;
                                                                                                                             return {
                                                                                                                                 useCases
                                                                                                                             };
                                                                                                                         });
                                                                }
                                }*/



        console.log(this.state.useCases);

    }

    handleUseCaseDesc(id, value) {

    let step = "assetUseCaseDesc";
    let index = id.charAt(0);;

    if(this.state.useCases[index][step].length < 300){
                                                        this.setState((prevState) => {
                                                                                                                                 const useCases = [...prevState.useCases];
                                                                                                                                 useCases[index][step] = value;
                                                                                                                                 return {
                                                                                                                                     useCases
                                                                                                                                 };
                                                                                                                             });
                     }

                                    console.log(this.state.useCases);


    }






//method to handle image upload and extracting base64 name
    handleFileUpload(file) {

        const self = this;
        if (file !== null) {
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.setState({ base64URl: reader.result, imageName: file.name, file,imageUploaded:true });

            };

        }else{

        file = new File([""], "dummyLogo.png", {type: 'image/png'})
        console.log(file.name)
        this.setState({imageUploaded:false, imageName: file.name,base64URl:"",file });

        }

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

//method to populate other practices dropdown
    getOtherOwningPracticeAutoSuggest(event) {

console.log(this.state.owningPracticeManager)


        var newAray = [];
        const queryValue = event.target.value;
        this.setState({ [event.target.name]: queryValue });


if(this.state.owningPracticeManager.length > 0){
                                                                for (var i = 0; i < this.state.allPractices.length; i++) {
                                                                            if (this.state.allPractices[i].description.toLowerCase().includes(queryValue.toLowerCase()) && !this.state.owningPracticeManager[0].description.toLowerCase().includes(queryValue.toLowerCase()) ) {
                                                                                newAray.push(this.state.allPractices[i]);
                                                                            }
                                                                        }


                                                                        this.setState({
                                                                            otherOwningPractice: newAray
                                                                        })

}else{

for (var i = 0; i < this.state.allPractices.length; i++) {
                                                                            if (this.state.allPractices[i].description.toLowerCase().includes(queryValue.toLowerCase())) {
                                                                                newAray.push(this.state.allPractices[i]);
                                                                            }
                                                                        }


                                                                        this.setState({
                                                                            otherOwningPractice: newAray
                                                                        })


}


if(queryValue === ''){
        this.setState({
                    otherOwningPractice: []
                })

        }

        console.log(newAray)

    }

//method to populate department dropdown
    validateDeparmentCode(event) {

        this.setState({ assetDepartmentCodeError: '' })
        const queryValue = event.target.value;
        this.setState({ [event.target.name]: queryValue });

        if (queryValue.replace(/\s/g, "").length >= 4) {
            AjaxWrapper.get(VALIDATE_DEPARTMENT_CODE + queryValue.replace(/\s/g, ""))
                .then((res) => {
                    console.log(res)

                     if (res.apiError === 502) {
                        res.response.json().then(data => {
                            this.setState({
                                assetDepartmentCodeError: data.response.description,
                            });
                        });


                    } else if (res.apiError){
                                                 this.setState({
                                                    assetDepartmentCodeError: "Not able to fetch department based on you entry. Please try after sometime",
                                                });

                    }else {
                        this.setState({
                            assetDepartmentCode: res.response.description,
                            assetDepartmentCodeResponse: res.response

                        });
                    }

                }
                );
        }else{
        this.setState({assetDepartmentCode:[]})
        }
    }

//method to populate lop pages dropdown
    getLopPagesAutoSuggest(event) {


        const queryValue = event.target.value;
        this.setState({
            [event.target.name]: queryValue,
            lopresponseError: '',
        });

        if (queryValue.replace(/\s/g, "").length > 5) {
            AjaxWrapper.get(KNOWID_AUTOSUGGEST + queryValue.replace(/\s/g, ""))
                .then((res) => {
                    if (res.apiError === 502) {
                        //console.log(res)

                        res.response.json().then(data => {
                            this.setState({
                                lopresponseError: data.response.title,
                            });
                        });


                    } else if(res.apiError){
                    this.setState({
                                                    lopresponseError: "Oops! Something went wrong. Please try again!",
                                                });
                    }

                    else {
                        this.setState({
                            lopPages: res.response.docs,
                            lopresponse: res.response

                        });
                    }
                }

                );
        }
        else{
                                                            this.setState({lopPages:[]})
                                                            }
    }

//method to populate Client impact field dropdown
    getClientImpactCasesAutoSuggest(event) {

        const queryValue = event.target.value;
        this.setState({ [event.target.name]: queryValue, clientImpactCasesError: '' });

        if (queryValue.replace(/\s/g, "").length > 5) {
            AjaxWrapper.get(KNOWID_AUTOSUGGEST + queryValue.replace(/\s/g, ""))
                .then((res) => {
                    if (res.apiError===502) {
                        //console.log(res)

                        res.response.json().then(data => {
                            this.setState({
                                clientImpactCasesError: data.response.title,
                            });
                        });


                    } else if(res.apiError){
                                          this.setState({
                                                                          clientImpactCasesError: "Oops! Something went wrong. Please try again!",
                                                                      });
                                          }

                                          else {
                        this.setState({
                            clientImpactCases: res.response.docs,
                            clientImpactCasesResponse: res.response

                        });
                    }

                }

                );


        }else{
                                                                     this.setState({clientImpactCases:[]})
                                                                     }
    }

//method to populate sample outputs field dropdown
    getSampleOutputsAutoSuggest(event) {

        const queryValue = event.target.value;
        this.setState({ [event.target.name]: queryValue, sampleOutputsError: '' });

        if (queryValue.replace(/\s/g, "").length > 5) {
            AjaxWrapper.get(KNOWID_AUTOSUGGEST + queryValue.replace(/\s/g, ""))
                .then((res) => {

                    if (res.apiError===502) {
                        //console.log(res)

                        res.response.json().then(data => {
                            this.setState({
                                sampleOutputsError: data.response.title,
                            });
                        });


                    } else if(res.apiError){
                                                                this.setState({
                                                                                                sampleOutputsError: "Oops! Something went wrong. Please try again!",
                                                                                            });
                                                                }
                                                                else {
                        this.setState({
                            sampleOutputs: res.response.docs,
                            sampleOutputsResponse: res.response

                        });
                    }



                }

                );



        }else{
                                                                              this.setState({sampleOutputs:[]})
                                                                              }
    }

//method to populate Emguides field dropdown
    getEmGuideAutoSuggest(event) {




        const queryValue = event.target.value;
        this.setState({ [event.target.name]: queryValue, emGuideError: '' });

        if (queryValue.replace(/\s/g, "").length > 5) {
            AjaxWrapper.get(KNOWID_AUTOSUGGEST + queryValue.replace(/\s/g, ""))
                .then((res) => {

                    if (res.apiError===502) {
                        //console.log(res)

                        res.response.json().then(data => {
                            this.setState({
                                emGuideError: data.response.title,
                            });
                        });


                    } else if(res.apiError){
                          this.setState({
                                  emGuideError: "Oops! Something went wrong. Please try again!",
                              });
                          }
                          else {
                        this.setState({
                            emGuide: res.response.docs,
                            emGuideResponse: res.response
                        });
                    }


                }

                );


        }else{
                                                                                       this.setState({emGuide:[]})
                                                                                       }
    }

//method to wait for particular time after user stop typing and call sendToParent
    getDemoVideoAutoSuggest(event) {

        const queryValue = event.target.value;

        this.setState({demoVideo:[]})

        const self = this;

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            demoVideoError: '',
            [event.target.name]: queryValue,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.sendToParent(queryValue);
            }, 3000)
        });


    }

//method to populate demo video field dropdown  after getting input from getDemoVideoAutoSuggest
    sendToParent(enteredText) {


        AjaxWrapper.get(KNOW_NOW_VIDEO + enteredText)
            .then((res) => {
                console.log(res);

                if (res.apiError) {
                    //console.log(res)
                    this.setState({ ErrorCall:true,demoVideoError: "Enter a valid Video title",})

                } else if(res.apiError){
                                        res.response.json().then(data => {
                                        this.setState({
                                            demoVideoError: data.response.docs,
                                        });
                                    });
                }

                else {
                    this.setState({
                        demoVideo: res.response.docs,
                        demoVideoResponse: res.response
                    });
                }


            }

            );
        //this.props.searching(this.state.name);
    }

//method to populate practice manager autosuggest dropdown
    getPersonAutosuggestList(event) {

        const queryValue = event.target.value;
        this.setState({ practiceManagerSearch: queryValue });

        this.setState({practiceManagerError:""})

        if (queryValue.replace(/\s/g, "").length >= 2) {


                AjaxWrapper.get(PERSON_AUTOSUGGEST + queryValue).then((res) =>{


                if(res.apiError){
                this.setState({practiceManagerError:"Oops! Something went wrong. Please try again!"})

                }else{
                 this.setState({
                                    personAutosuggestList: res.response.docs
                                });
                }

                });



        }else{
        this.setState({personAutosuggestList:[]})
        }
    }

//method to populate Service line autosuggest dropdown
    getPersonAutosuggestListServiceLine(event) {
        const queryValue = event.target.value;
        console.log(queryValue);
        this.setState({ serviceLine: queryValue });

        if (queryValue.replace(/\s/g, "").length >= 2) {

        AjaxWrapper.get(PERSON_AUTOSUGGEST + queryValue).then((res) =>{


                        if(res.apiError){
                        this.setState({serviceLineManagerError:"Oops! Something went wrong. Please try again!"})

                        }else{
                         this.setState({
                                            personAutosuggestList_serviceLine: res.response.docs
                                        });
                        }

                        });



        }else{
                 this.setState({personAutosuggestList_serviceLine:[]})
                 }
    }

//method to populate expert autosuggest dropdown
    getPersonAutosuggestListExpert(event) {

        const queryValue = event.target.value;
        this.setState({ expert: queryValue });

        if (queryValue.replace(/\s/g, "").length >= 2) {


        AjaxWrapper.get(PERSON_AUTOSUGGEST + queryValue).then((res) =>{


                                if(res.apiError){
                                this.setState({expertManagerError:"Oops! Something went wrong. Please try again!"})

                                }else{
                                 this.setState({
                                                    personAutosuggestList_expert: res.response.docs
                                                });
                                }

                                });

        }else{
                          this.setState({personAutosuggestList_expert:[]})
                          }

    }

//method to populate Research autosuggest dropdown
    getPersonAutosuggestListResearchTeam(event) {

        const queryValue = event.target.value;
        this.setState({ researchTeam: queryValue });

        if (queryValue.replace(/\s/g, "").length >= 2) {

         AjaxWrapper.get(PERSON_AUTOSUGGEST + queryValue).then((res) =>{


                                        if(res.apiError){
                                        this.setState({researchTeamManagerError:"Oops! Something went wrong. Please try again!"})

                                        }else{
                                         this.setState({
                                                            personAutosuggestList_researchTeam: res.response.docs
                                                        });
                                        }

                                        });

                }else{
                                           this.setState({personAutosuggestList_researchTeam:[]})
                                           }

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

//Method to select value from drop down
    selectedOption(option, stepname) {

        if (stepname === 'PracticeManager') {


            if (this.state.practiceManager.length <= 1) {

               if(this.state.practiceManager.length > 0){

                            for(var i=0;i<this.state.practiceManager.length;i++){

                            if(this.state.practiceManager[i].assetTeamContactFullName === option.preferred_name + ' ' + option.last_name){
                            alert('Already present!')
                            this.setState({personAutosuggestList:[],practiceManagerSearch: ' ',})
                            break;
                            }else{
                            this.setState((prevState) => ({
                                                personAutosuggestList: [],
                                                practiceManagerSearch: ' ',
                                                practiceManager: [...prevState.practiceManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                                internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],
                                            }))
                                            break;

                            }
                            }


                            }

                            else{
                           this.setState((prevState) => ({
                                               personAutosuggestList: [],
                                               practiceManagerSearch: ' ',
                                               practiceManager: [...prevState.practiceManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                               internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],
                                           }))
                            }

            } else {
                alert('You can add up to two people for each role.');
                this.setState((prevState) => ({
                    personAutosuggestList: [],
                    practiceManagerSearch: ' ',
                }));
            }

        } else if (stepname === 'ServiceLineLeader') {

        if (this.state.serviceLineManager.length <= 1) {

                       if(this.state.serviceLineManager.length > 0){

                                    for(var i=0;i<this.state.serviceLineManager.length;i++){

                                    if(this.state.serviceLineManager[i].assetTeamContactFullName === option.preferred_name + ' ' + option.last_name){
                                    alert('Already present!')
                                    this.setState({personAutosuggestList_serviceLine:[],serviceLine: ' ',})
                                    break;
                                    }else{
                                    this.setState((prevState) => ({
                                                        personAutosuggestList_serviceLine: [],
                                                        serviceLine: ' ',
                                                        serviceLineManager: [...prevState.serviceLineManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                                        internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],

                                                    }))
                                                    break;

                                    }
                                    }


                                    }

                                    else{
                                   this.setState((prevState) => ({
                                                       personAutosuggestList_serviceLine: [],
                                                       serviceLine: ' ',
                                                       serviceLineManager: [...prevState.serviceLineManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                                       internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],

                                                   }))
                                    }

                    }

        else {
                alert('You can add up to two people for each role.');
                this.setState((prevState) => ({
                    personAutosuggestList_serviceLine: [],
                    serviceLine: ' ',


                }));
            }
        }

        else if (stepname === 'Expert') {

        if (this.state.expertManager.length <= 1) {

                               if(this.state.expertManager.length > 0){

                                            for(var i=0;i<this.state.expertManager.length;i++){

                                            if(this.state.expertManager[i].assetTeamContactFullName === option.preferred_name + ' ' + option.last_name){
                                            alert('Already present!')
                                            this.setState({personAutosuggestList_expert:[],expert: ' ',})
                                            break;
                                            }else{
                                            this.setState((prevState) => ({
                                                                personAutosuggestList_expert: [],
                                                                expert: ' ',
                                                                expertManager: [...prevState.expertManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                                                internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],

                                                            }))
                                                            break;

                                            }
                                            }


                                            }

                                            else{
                                           this.setState((prevState) => ({
                                                               personAutosuggestList_expert: [],
                                                               expert: ' ',
                                                               expertManager: [...prevState.expertManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                                               internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],

                                                           }))
                                            }

                            }
        else {
                alert('You can add up to two people for each role.');
                this.setState((prevState) => ({
                    personAutosuggestList_expert: [],
                    expert: ' ',


                }));
            }
        }

        else if (stepname === 'ResearchTeam') {
        if (this.state.researchTeamManager.length <= 1) {

                                       if(this.state.researchTeamManager.length > 0){

                                                    for(var i=0;i<this.state.researchTeamManager.length;i++){

                                                    if(this.state.researchTeamManager[i].assetTeamContactFullName === option.preferred_name + ' ' + option.last_name){
                                                    alert('Already present!')
                                                    this.setState({personAutosuggestList_researchTeam:[],researchTeam: ' ',})
                                                    break;
                                                    }else{
                                                    this.setState((prevState) => ({
                                                                        personAutosuggestList_researchTeam: [],
                                                                        researchTeam: ' ',
                                                                        researchTeamManager: [...prevState.researchTeamManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                                                        internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],

                                                                    }))
                                                                    break;

                                                    }
                                                    }


                                                    }

                                                    else{
                                                   this.setState((prevState) => ({
                                                                       personAutosuggestList_researchTeam: [],
                                                                       researchTeam: ' ',
                                                                       researchTeamManager: [...prevState.researchTeamManager, { assetTeamContactType: stepname, assetTeamContactFullName: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", assetTeamContactFmno: option.fmno, assetTeamContactEmail: option.notes_email_id, assetTeamContactStatus: option.individual_status }],
                                                                       internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed" }],

                                                                   }))
                                                    }

                                    }
        else {
                alert('You can add up to two people for each role.');
                this.setState((prevState) => ({
                    personAutosuggestList_researchTeam: [],
                    researchTeam: ' ',


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
                                                internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", fmno: option.fmno }],

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
                                               internalContactParentList: [...prevState.internalContactParentList, { Contact_type: stepname, name: option.preferred_name + ' ' + option.last_name, image: EXTERNAL_ASSETS + "/person/fmno_photos/" + option.fmno + "/thumb.jpg?dummy=allowed", fmno: option.fmno }],

                                           }))
                            }

            } else {
                alert('You can add up to two people.');
                this.setState((prevState) => ({
                    personAutosuggestList_assetTeamLeader: [],
                    assetTeamLeader: ' ',


                }));
            }


        } else if (stepname === 'SmartLop') {

        if(this.state.lopPagesManager.length > 0){

        for(var i=0;i<this.state.lopPagesManager.length;i++){

        if(this.state.lopPagesManager[i].taggedDocId === option.id){
        alert('Already present!')
        this.setState({lopPages:[],lopPagesSearch: ' ',})
        break;
        }else{
        this.setState((prevState) => ({
                        lopPages: [],
                        lopPagesSearch: ' ',
                        lopPagesManager: [...prevState.lopPagesManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                    }))
break;
        }
        }


        }

        else{
       this.setState((prevState) => ({
                       lopPages: [],
                       lopPagesSearch: ' ',
                       lopPagesManager: [...prevState.lopPagesManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                   }))
        }



            //console.log(this.state.lopresponse)

        } else if (stepname === 'ClientImpactCase') {

         if(this.state.clientImpactCasesManager.length > 0){

                for(var i=0;i<this.state.clientImpactCasesManager.length;i++){

                if(this.state.clientImpactCasesManager[i].taggedDocId === option.id){
                alert('Already present!')
                this.setState({clientImpactCases:[], clientImpactCasesSearch: ' '})
                break;
                }else{
                this.setState((prevState) => ({
                                clientImpactCases: [],
                                clientImpactCasesSearch: ' ',
                                clientImpactCasesManager: [...prevState.clientImpactCasesManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                            }))
break;
                }
                }


                }

                else{
               this.setState((prevState) => ({
                               clientImpactCases: [],
                               clientImpactCasesSearch: ' ',
                               clientImpactCasesManager: [...prevState.clientImpactCasesManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                           }))
                }

            console.log(this.state.clientImpactCasesResponse)

        } else if (stepname === 'SampleOutput') {

        if(this.state.sampleOutputsManager.length > 0){

                        for(var i=0;i<this.state.sampleOutputsManager.length;i++){

                        if(this.state.sampleOutputsManager[i].taggedDocId === option.id){
                        alert('Already present!')
                        this.setState({sampleOutputs:[],sampleOutputsSearch: ' '})
                        break;
                        }else{
                         this.setState((prevState) => ({
                                        sampleOutputs: [],
                                        sampleOutputsSearch: ' ',
                                        sampleOutputsManager: [...prevState.sampleOutputsManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                                    }))
break;
                        }
                        }


                        }

                        else{
                        this.setState((prevState) => ({
                                       sampleOutputs: [],
                                       sampleOutputsSearch: ' ',
                                       sampleOutputsManager: [...prevState.sampleOutputsManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                                   }))
                        }

            console.log(this.state.sampleOutputsResponse)

        } else if (stepname === 'EMGuide') {

        if(this.state.emGuideManager.length > 0){

                                for(var i=0;i<this.state.emGuideManager.length;i++){

                                if(this.state.emGuideManager[i].taggedDocId === option.id){
                                alert('Already present!')
                                this.setState({emGuide:[],emGuideSearch: ' '})
                                break;
                                }else{
                                  this.setState((prevState) => ({
                                                 emGuide: [],
                                                 emGuideSearch: ' ',
                                                 emGuideManager: [...prevState.emGuideManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                                             }))
break;
                                }
                                }


                                }

                                else{
                                 this.setState((prevState) => ({
                                                emGuide: [],
                                                emGuideSearch: ' ',
                                                emGuideManager: [...prevState.emGuideManager, { taggedDocType: stepname, taggedDocId: option.id, taggedDocTitle: option.title, attachment_count: option.attachment_count, page_count: option.page_count, zip_size: option.zip_size }],

                                            }))
                                }
            console.log(this.state.emGuideResponse)

        } else if (stepname === 'KnowNow') {
         if(this.state.demoVideoManager.length > 0){

                                        for(var i=0;i<this.state.demoVideoManager.length;i++){

                                        if(this.state.demoVideoManager[i].taggedDocId === option.id){
                                        alert('Already present!')
                                        this.setState({demoVideo:[],demoVideoSearch: ' '})
                                        break;
                                        }else{
                                          this.setState((prevState) => ({
                                                          demoVideo: [],
                                                          demoVideoSearch: ' ',
                                                          demoVideoManager: [...prevState.demoVideoManager, { taggedDocType: stepname, taggedDocId: option.videoId, taggedDocTitle: option.title ,attachment_count: "", page_count: "", zip_size: "" }],

                                                      }))
break;
                                        }
                                        }


                                        }

                                        else{
                                         this.setState((prevState) => ({
                                                         demoVideo: [],
                                                         demoVideoSearch: ' ',
                                                         demoVideoManager: [...prevState.demoVideoManager, { taggedDocType: stepname, taggedDocId: option.videoId, taggedDocTitle: option.title ,attachment_count: "", page_count: "", zip_size: "" }],

                                                     }))
                                        }
            console.log(this.state.demoVideoResponse)

        } else if (stepname === 'owningPractice') {
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

        }
        else if (stepname === 'otherOwningPractice') {

         if(this.state.otherOwningPracticeManager.length > 0){

                        const { length } = this.state.otherOwningPracticeManager;
                          const id = length + 1;
                          const found = this.state.otherOwningPracticeManager.some(el => el.id === option.shortName);
                          if (!found) {

                          this.setState((prevState) => ({
                                          otherOwningPractice: [],
                                          otherOwningPracticeSearch: ' ',
                                          otherOwningPracticeManager: [...prevState.otherOwningPracticeManager, { description: option.description, id: option.shortName }],
                                      }))

                          }else{alert('Already present!')
                            this.setState({otherOwningPractice:[],otherOwningPracticeSearch: ''})}
                                                        }

                                                        else{
                                                        this.setState((prevState) => ({
                                                                        otherOwningPractice: [],
                                                                        otherOwningPracticeSearch: ' ',
                                                                        otherOwningPracticeManager: [...prevState.otherOwningPracticeManager, { description: option.description, id: option.shortName }],
                                                                    }))
                                                        }


                }




        else if (stepname === 'assetDepartmentCode') {

          if(this.state.assetDepartmentCodeManager.length > 0){

                const { length } = this.state.assetDepartmentCodeManager;
                  const id = length + 1;
                  const found = this.state.assetDepartmentCodeManager.some(el => el.id === option.id);
                  if (!found) {

                  this.setState((prevState) => ({
                        assetDepartmentCode: [],
                        assetDepartmentCodeSearch: '',
                        assetDepartmentCodeManager: [...prevState.assetDepartmentCodeManager, { id: option.id }],
                    }))

                  }else{alert('Already present!')
                    this.setState({assetDepartmentCode:[],assetDepartmentCodeSearch: ''})}
                                                }

                                                else{
                                                this.setState((prevState) => ({
                                                                assetDepartmentCode: [],
                                                                assetDepartmentCodeSearch: '',
                                                                assetDepartmentCodeManager: [...prevState.assetDepartmentCodeManager, { id: option.id }],
                                                            }))
                                                }


        }

    }

//method to remove item from an array if user clicks on cancel option
    removePracticeManager(index) {

        var newAray = this.state.practiceManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ practiceManager: newAray });

        console.log(this.state.practiceManager.length)
        if(this.state.practiceManager.length === 1){this.setState({ practiceManagerSearch: '' })}


    } removeServiceManager(index) {

        var newAray = this.state.serviceLineManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ serviceLineManager: newAray });
         if(this.state.serviceLineManager.length === 1){this.setState({ serviceLine: '' })}

    }
    removeExpertManager(index) {

        var newAray = this.state.expertManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ expertManager: newAray });
        if(this.state.expertManager.length === 1){this.setState({ expert: '' })}

    } removeReSearchTeamManager(index) {

        var newAray = this.state.researchTeamManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ researchTeamManager: newAray });
         if(this.state.researchTeamManager.length === 1){this.setState({ research: '' })}

    }
    removeAssetLeaderManager(index) {
        var newAray = this.state.assetTeamLeaderManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ assetTeamLeaderManager: newAray });
        if(this.state.assetTeamLeaderManager.length === 1){this.setState({ assetTeamLeader: '' })}

    } removeLopPagesManager(index) {

        var newAray = this.state.lopPagesManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ lopPagesManager: newAray });
         if(this.state.lopPagesManager.length === 1){this.setState({ lopPagesSearch: '' })}

    }
    removeClientImpactCases(index) {

        var newAray = this.state.clientImpactCasesManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ clientImpactCasesManager: newAray });
        if(this.state.clientImpactCasesManager.length === 1){this.setState({ clientImpactCasesSearch: '' })}

    } removeSampleOutputs(index) {

        var newAray = this.state.sampleOutputsManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ sampleOutputsManager: newAray });
        if(this.state.sampleOutputsManager.length === 1){this.setState({ sampleOutputsSearch: '' })}

    }
    removeEmGuides(index) {

        var newAray = this.state.emGuideManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ emGuideManager: newAray });
        if(this.state.emGuideManager.length === 1){this.setState({ emGuideSearch: '' })}

    }
    removeDemoVideo(index) {

        var newAray = this.state.demoVideoManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ demoVideoManager: newAray });
        if(this.state.demoVideoManager.length === 1){this.setState({ demoVideoSearch: '' })}

    }
    removeOwningPractice(index) {

        var newAray = this.state.owningPracticeManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ owningPracticeManager: newAray });
         if(this.state.owningPracticeManager.length === 1){this.setState({ owningPracticeSearch: '' })}

    }
    removeOtherOwningPractice(index) {

        var newAray = this.state.otherOwningPracticeManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ otherOwningPracticeManager: newAray });
        if(this.state.otherOwningPracticeManager.length === 1){this.setState({ otherOwningPracticeSearch: '' })}

    }
    removeAssetDepartmentCode(index) {

        var newAray = this.state.assetDepartmentCodeManager.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ assetDepartmentCodeManager: newAray });
         if(this.state.assetDepartmentCodeManager.length === 1){this.setState({ assetDepartmentCodeSearch: '' })}

    }

//Delete extra use case, one use case is mandatory
    deleteUseCaseList(event, index) {
        event.preventDefault();
        var newAray = this.state.useCases.slice();
        //delete element by index
        newAray.splice(index, 1);
        this.setState({ useCases: newAray });

    }

//add extra use case, upto 6
    addUseCaseButton(event) {
        event.preventDefault();
        if (this.state.useCases.length > 5) {
            alert("You can add upto six use cases...")
        } else {
            this.setState((prevState) => {
                prevState.useCases.push({ assetUseCaseTitle: "", assetUseCaseDesc: "" });
                return {
                    useCases: prevState.useCases
                }
            }
            );

        }
    }

//scroll to page ref.
    sideNavCallback = (nav) => {
        let elRef = null;
        console.log(nav);
        if (nav === 'basic') {
            elRef = this.refA;
        } else if (nav === 'cases') {
            elRef = this.refB;
        } else if (nav === 'Materials') {
            elRef = this.refC;
        } else if (nav === 'contacts') {
            elRef = this.refC;
        } else if (nav === 'Deployment') {
            elRef = this.refE;
        } else if (nav === 'Technology') {
            elRef = this.refF;
        } else if (nav === 'Additional') {
            elRef = this.refF;
        }
        // Incase the ref supplied isn't ref.current
        const el = elRef.current ? elRef.current : elRef
        // Scroll the element into view
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',

        })
    }

//method to handle footer call back
    footerCallback = (nav, e) => {
        if (nav === 'Submit') {
            this.onSubmit(e);
        } else if (nav === 'Preview') {
            this.onPreview();
        } else if (nav === 'Save Draft') {
            this.onSaveDraft();
        } else if (nav === 'Delete Draft') {
            this.onDeleteDraft();
        } else if (nav === 'Cancel') {
            this.onCancel();
        }
    }

//Form validate if any mandatory field is missing or not and for submit form
    onSubmit(event) {
        //alert(event);
        const form = event.currentTarget;
        console.log(this.state)

        if(this.state.cost == ''){
        this.setState({ isCostEmpty: true });
        this.setState({ validated: false });
        }

        if(this.state.resourcing == ''){
        this.setState({ isResourcingEmpty: true });
        this.setState({ validated: false });
        }

        if(this.state.timeline == ''){
        this.setState({ isTimelineEmpty: true });
        this.setState({ validated: false });
        }

        if(this.state.assetDescription == ''){
        this.setState({ isAssetDescEmpty: true });
        this.setState({ validated: false });
        }

        if (form.checkValidity()) {
            event.preventDefault();
            console.log('form is valid and ready to submit');
            this.setState({ confirmPopUp: true });
            //window.location = '/confirmation';
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

//method to get data for preview
    onPreview() {
        this.props.previewCallback(this.getFinalDataPreview());
    }

//method to open popup and get data for save draft
    onSaveDraft() {


            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

            this.saveData(this.getSaveDraftData());


        //alert('onSaveDraft');
    }

//method to cancel form
    onCancel() {
        this.setState({ cancelForm: true })
        //alert('onSaveDraft');
    }

//method to open delete popup
    onDeleteDraft() {
        this.setState({ deleteDraft: true })
        //alert('onDeleteDraft');
    }

//will call get practice on the page load
    componentWillMount() {

    if(document.getElementById("legacy-knowTab")){
    var banner = document.getElementById("legacy-knowTab");
                    banner.style.display = "none";
    }


        AjaxWrapper.get('/ksassetbe/getAllPractices').then(res => {
            if (res.apiError) {
                //console.log(res)

                    this.setState({
                        owningPracticeManagerError:"Oops! Something went wrong. Please try again!",
                        otherOwningPracticeManagerError:"Oops! Something went wrong. Please try again!"
                });


            } else {
                this.setState({
                    allPractices: res.response.owningPractice,
                });
            }

        })
    }

//render method
    render() {
        let deleteClose = () => this.setState({ deleteDraft: false });
        let cancelClose = () => this.setState({ cancelForm: false });
        let continueWorking = () => this.setState({ confirmPopUp: false });

        console.log(this.props.data)

        const { assetID, assetName, assetDepartmentCodeSearch, assetTeamLeader,
            owningPractice,
            owningPracticeSearch,
            otherOwningPractice,
            otherOwningPracticeSearch,
            assetDescription,
            searchResultDescription,
            userCase,
            description,
            practiceManager,
            serviceLine,
            expert,
            researchTeam,
            lopPages,
            lopPagesSearch,
            clientImpactCases,
            sampleOutputs,
            emGuide,
            demoVideo,
            timeline,
            resourcing,
            cost,
            technologyDescription,
            assetWebsite,
            assetEmailAddress,
            validated, clientImpactCasesSearch, sampleOutputsSearch, emGuideSearch, demoVideoSearch } = this.state
        return (
            <div className="assetSubmissionContainer" ref={this.refA}>

                {/* <NavBar /> */}
                <div className="assetSubmissionHeader"> <a href ="/intranet" ><img src={Mckinsey_Header_Logo} alt="mckinsey header" ></img></a><hr /></div>
                {this.state.mandateFieldErr ? <ErrorSubmit /> : ({ ...this.state.showDraft ? <DraftSubmit /> : (<div></div>) })}
                         {this.state.errorSubmit ? (<div className="error-confirm"><p className="err-text-confirm">Something went wrong. Please try after sometime.</p></div>) : ('')}
                <SideNav callback={this.sideNavCallback} />

                <div className="custom assetSubmissionContent" >
                {this.props.editCall ? (<div ref={this.refSubmit} className="assetSubmissionContentHeader" >
                                                                     <p className="create-a-full-asset">Edit your asset</p>
                                                                     <p className="thank-you-for-taking">Thank you for keeping your assets up-to-date! Please note that any changes you submit will be reviewed by the EKAM team before being published.</p>
                                                                     <p className="thank-you-for-taking">If you have questions, we are here to help: <a href="mailto:asset_library_support@mckinsey.com">asset_library_support@mckinsey.com</a></p>
                                                                 </div>) : (<div ref={this.refSubmit} className="assetSubmissionContentHeader" >
                                                                                                    <p className="create-a-full-asset">Create a full asset page</p>
                                                                                                    <p className="thank-you-for-taking">Thank you for taking the time to add a tech asset to our Library!  Doing this will make it easier for our colleagues to find and use your asset for the right engagements.</p>
                                                                                                    <p className="thank-you-for-taking"><strong>Please note: </strong> The information you upload will need to be reviewed and approved by the Asset Library content curator in your cell. This form is for you to enter information related to a mature client-facing asset. If you have a new/early asset and you would like this asset to be part of the Library but may not be ready to provide all the information requested in this form, reach out to your Asset Library content curator in your cell – he/she can upload a brief version of the asset description into the Library through a separate mechanism. Please reach out to your practice manager if you don’t know who your Asset Library content curator is.</p>
                                                                                                    <p className="thank-you-for-taking">If you have questions, we are here to help: <a href="mailto:asset_library_support@mckinsey.com">asset_library_support@mckinsey.com</a></p>
                                                                                                </div>) }



                    <hr />
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={e => this.onSubmit(e)}
                    >
                            <div className="row">
                                <div className="col-md-4 descTextPerSection">
                                    <p className="step-name">Step 1:</p>
                                    <p className="common-titles">BASIC INFORMATION</p>
                                    <p className="common-titles-info">Enter basic information for your Asset to make it easy to quickly find, understand, and link to our financial database. </p>
                                    <p className="common-titles-info">We know you have thoughtfully picked a name for this asset! Please double check that the name clearly describes what it does, is intuitive for your clients and colleagues, and safe to use legally. Reach out to <a target="_blank" href = "https://home.intranet.mckinsey.com/profiles/people/172539">Kevin Drennan</a> for help!</p>
                                    <p className="common-titles-info">Contact your cell’s finance lead if you are not sure what your department code(s) is. If you don’t know who is your finance lead, contact <a href="mailto:Frederic_de_Rougemont@mckinsey.com">Frederic_de_Rougemont@mckinsey.com</a></p>

                                </div>
                                <div className="col-md-8 actualContentPerSection">
                                            <Form.Label className="firstFieldLabel">Asset Logo</Form.Label>
                                            <ImageUpload
                                                accept='.jpg,.jpeg,.png,.gif'
                                                extnErrMsg='Please choose a jpg, jpeg, png, or gif. Any will work!'
                                                maxSize={10}
                                                handleFileUpload={this.handleFileUpload}
                                                imageSrc={this.state.base64URl}
                                                isMandatory
                                            />
                                    <div>

                                        <Form.Label className="subheadings">Asset Name<span className="asterisks">&#42;</span></Form.Label>
                                        <Form.Control className="rectangle submissionInput" type="assetName" name="assetName" value={assetName} autoComplete="off" placeholder="Type your solution name" onChange={this.changeHandler} required />
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                    </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <Form.Label className="subheadings">Asset Department Code(s)</Form.Label>
                                        <Form.Control className="rectangle submissionInput" type="text" name="assetDepartmentCodeSearch" value={assetDepartmentCodeSearch} autoComplete="off" defaultValue="" placeholder="Type your 4-digit code (enter all that apply)" onChange={this.validateDeparmentCode.bind(this)} />
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                    </Form.Control.Feedback>
                                        {this.state.assetDepartmentCodeError.length !== 0 ? (<p className="api-error"> {this.state.assetDepartmentCodeError}</p>)
                                            :
                                            (this.state.assetDepartmentCode.length > 0 ? (
                                                <p className="autosuggest-para">
                                                    {this.state.assetDepartmentCode.map(option => (
                                                        <p onClick={() => this.selectedOption(option, "assetDepartmentCode")} key={option.id}> {option.title}</p>

                                                    ))}
                                                </p>
                                            )
                                                : (''))}

                                        <div className="autosuggest-selected-items">
                                            {
                                                this.state.assetDepartmentCodeManager.map((manager, index) => (
                                                    <div className="selected-item">
                                                        <span className="name">{manager.id}</span>
                                                        <img className="close" src={Icon_CloseCircle} alt="person logo" onClick={() => this.removeAssetDepartmentCode(index)}></img>


                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                    
                                    <Form.Label className="subheadings">Asset Leader/First Alert<span className="asterisks">&#42;</span></Form.Label><span className="list-validation" >{this.state.assetTeamLeaderManager.length}/2</span>
                                    <Form.Control className="rectangle submissionInput" type="text" name="assetTeamLeader" value={assetTeamLeader} autoComplete="off" defaultValue="" placeholder="Type and select a colleague's name" onChange={this.getPersonAutosuggestListAssetTeamLeader} required />

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
                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                </Form.Control.Feedback>
                                    

                                    <Form.Label className="subheadings">Owning Practice<span className="asterisks">&#42;</span></Form.Label><span className="list-validation">{this.state.owningPracticeManager.length}/1</span>
                                    <Form.Control className="rectangle submissionInput" type="text" name="owningPracticeSearch" value={owningPracticeSearch} autoComplete="off" defaultValue="" placeholder="Type and select a practice name" onChange={this.getOwningPracticeAutoSuggest.bind(this)} required />
                                    {this.state.owningPracticeManagerError.length !== 0 ? (<p className="api-error"> {this.state.owningPracticeManagerError}</p>)
                                                                                :

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


                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                    
                                    <Form.Label className="subheadings">Other Relevant Practices</Form.Label><span className="list-validation">Permission required from each</span>
                                    <Form.Control className="rectangle submissionInput" type="text" name="otherOwningPracticeSearch" value={otherOwningPracticeSearch} autoComplete="off" defaultValue="" placeholder="Type and select a practice name" onChange={this.getOtherOwningPracticeAutoSuggest.bind(this)} />
                                {this.state.owningPracticeManagerError.length !== 0 ? (<p className="api-error"> {this.state.owningPracticeManagerError}</p>)
                                                                                :
                                    (this.state.otherOwningPractice.length === 0 ? ('') : (
                                        <p className="autosuggest-para">
                                            {
                                                this.state.otherOwningPractice.map((option, index) => (
                                                    <p onClick={() => this.selectedOption(option, "otherOwningPractice")} key={index}> {option.description}</p>

                                                ))

                                            }
                                        </p>)
                                    )}
                                    <div className="autosuggest-selected-items">
                                        {
                                            this.state.otherOwningPracticeManager.map((manager, index) => (
                                                <div className="selected-item">
                                                    <span className="name">{manager.description}</span>
                                                    <img className="close" src={Icon_CloseCircle} alt="person logo"  onClick={() => this.removeOtherOwningPractice(index)}></img>

                                                </div>
                                            ))
                                        }

                                    </div>



                                    
                                    <Form.Label className="subheadings">Asset Description<span className="asterisks">&#42;</span></Form.Label><span className="rich-text-list-validation">{this.state.assetDescription.replace(/(<([^>]+)>)/ig, '').length}/1000 characters</span>
                                    <SummaryBox id="counttxt-assetDescription" errclassname={this.state.isAssetDescEmpty ? "rich-text-red-border" : ""} type="text" required={true} defaultValue={assetDescription} placeholder="Briefly describe what the asset consist of and its value proposition to clients in clear, practical and CST-friendly language..." onChange={this.changeHandlerEditor} maxLength={1000} error={""} name="assetDescription" value={assetDescription} />
                                    {/*<Form.Control as="textarea" className="rectangle-big" type="text" name="assetDescription" value={assetDescription} autoComplete="off" defaultValue="" placeholder="Briefly describe what the asset consist of and its value proposition to clients in clear, practical and CST-friendly language..." onChange={this.changeHandler} required />
                                        */}{this.state.isAssetDescEmpty ? ( <div className="invalid-feedback">This field is required </div>):('')}
                                    <br ref={this.refB} />

                                    <Form.Label className="subheadings">Search Result Description<span className="asterisks">&#42;</span></Form.Label><span className="list-validation">{this.state.searchResultDescription.length}/400 characters</span>
                                                                                        <Form.Control rows="3" as="textarea" className="rectangle-mid" type="text"  name="searchResultDescription" value={searchResultDescription} maxlength = "400" autoComplete="off"  defaultValue="" placeholder="What do you want to be displayed in search results? " onChange={(event) => this.changeHandler(event)}  required />
                                                                                        <Form.Control.Feedback type="invalid">
                                                                                            This field is required
                                                                                         </Form.Control.Feedback>
                                                                                        
                                </div>
                            </div>
                            <hr />

                            <div className="row">
                                  <div className="col-md-4 descTextPerSection">
                                        <p className="step-name">Step 2:</p>
                                        <p className="common-titles">COMMON USE CASES</p>
                                        <p className="common-titles-info">Help consultants who have never used this asset before understand what client problems it can help solve. You can add up to three.</p>
                                        <p className="tool-tip common-titles-info" data-tip data-for='Step 2'>Want to see an example?</p>


                                        <ReactTooltip className="customeTheme" id='Step 2' place="bottom" effect="solid" type="light">
                                            <p className="tool-tip-title">Use case 1 - Track value in a turnaround program</p>
                                            <p className="tool-tip-desc">Wave helps the TO track initiatives through transformation stage gates, establish strict program governance, and maintain a rigorous weekly reporting cadence. Wave is uniquely designed to link top-down goals with the impact delivered by each initiative</p>
                                            
                                            <p className="tool-tip-title">Use case 2 - Track value for merger programs</p>
                                            <p className="tool-tip-desc">Wave monitors value creation by tracking initiatives through a consistent and well-defined set of pipeline stages. Our real-time reporting provides multiple teams a single source of truth to track the merger’s progress against the plan and identify the initiatives that are at risk of falling behind</p>


                                        </ReactTooltip>
                                  </div>
                                                          <div className="col-md-8 actualContentPerSection">{

                                                                this.state.useCases.map((useCase, index) => {
                                                                console.log(index)
                                                                    return (
                                                                        <div>
                                                                        {index === 0 ? (<Fragment>
                                                                            
                                                                            <Form.Label className="firstFieldLabel useCaseLabel">Use Case<span className="asterisks">&#42;</span></Form.Label><span className="firstFieldValidation">{this.state.useCases[index].assetUseCaseTitle.length}/50 characters</span>
                                                                            <Form.Control type="text" className="rectangle submissionInput" type="text" name="assetUseCaseTitle" autoComplete="off" value={useCase.assetUseCaseTitle} defaultValue="" placeholder="Name a core use case" maxlength = "50" onChange={(event) => this.handleUseCase(event, index)} required />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                This field is required
                                                                             </Form.Control.Feedback>
                                                                            

                                                                            {/*<Form.Label className="subheadings">Description<span className="asterisks">&#42;</span></Form.Label><span className="list-validation">{this.state.useCases[index].assetUseCaseDesc.length}/300 characters</span>
                                                                            <Form.Control as="textarea" className="rectangle-big" type="text" name="assetUseCaseDesc" value={useCase.assetUseCaseDesc} autoComplete="off" defaultValue="" maxlength = "300" placeholder="Briefly describe this use case..." onChange={(event) => this.handleUseCase(event, index)} required />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                This field is required
                                                                            </Form.Control.Feedback>

*/}
                                                                           <Form.Label className="subheadings">Description<span className="asterisks">&#42;</span></Form.Label><span className="rich-text-list-validation">{this.state.useCases[index].assetUseCaseDesc.length}/300 characters</span>
                                                                            <SummaryBox id={index+"counttxt-usedesc"}  type="text" required={false} defaultValue={useCase.assetUseCaseDesc} placeholder="Briefly describe this use case..." onChange={this.handleUseCaseDesc} maxLength={300} error={""} name="assetUseCaseDesc" value={useCase.assetUseCaseDesc} />

                                                                            {index != 0 && <div className="delete-use-case" onClick={(event) => { this.deleteUseCaseList(event, index) }}>Delete Use case</div>}

                                                                        </Fragment>):(<Fragment>

                                                                                                                                                                  <Form.Label className="firstFieldLabel useCaseLabel">Use Case</Form.Label><span className="firstFieldValidation">{this.state.useCases[index].assetUseCaseTitle.length}/50 characters</span>
                                                                                                                                                                  <Form.Control type="text" className="rectangle submissionInput" type="text" name="assetUseCaseTitle" autoComplete="off" value={useCase.assetUseCaseTitle} defaultValue="" placeholder="Name a core use case" maxlength = "50" onChange={(event) => this.handleUseCase(event, index)} />
                                                                                                                                                                  <Form.Control.Feedback type="invalid">
                                                                                                                                                                      This field is required
                                                                                                                                                                   </Form.Control.Feedback>


                                                                                                                                                                  {/*<Form.Label className="subheadings">Description<span className="asterisks">&#42;</span></Form.Label><span className="list-validation">{this.state.useCases[index].assetUseCaseDesc.length}/300 characters</span>
                                                                                                                                                                  <Form.Control as="textarea" className="rectangle-big" type="text" name="assetUseCaseDesc" value={useCase.assetUseCaseDesc} autoComplete="off" defaultValue="" maxlength = "300" placeholder="Briefly describe this use case..." onChange={(event) => this.handleUseCase(event, index)} required />
                                                                                                                                                                  <Form.Control.Feedback type="invalid">
                                                                                                                                                                      This field is required
                                                                                                                                                                  </Form.Control.Feedback>

                                                                                      */}
                                                                                                                                                                 <Form.Label className="subheadings">Description</Form.Label><span className="rich-text-list-validation">{this.state.useCases[index].assetUseCaseDesc.length}/300 characters</span>
                                                                                                                                                                  <SummaryBox id={index+"counttxt-usedesc"}  type="text" required={false} defaultValue={useCase.assetUseCaseDesc} placeholder="Briefly describe this use case..." onChange={this.handleUseCaseDesc} maxLength={300} error={""} name="assetUseCaseDesc" value={useCase.assetUseCaseDesc} />

                                                                                                                                                                  {index != 0 && <div className="delete-use-case" onClick={(event) => { this.deleteUseCaseList(event, index) }}>Delete Use case</div>}

                                                                                                                                                              </Fragment>)}
                        </div>

                                                                    );
                                                                })

                                                            }
                                            <button className="add-btn" onClick={this.addUseCaseButton}>Add another</button>
</div>
                            </div>
                            <hr />

                            <div className="row">
                                                          <div className="col-md-4 descTextPerSection">
                                                            <p ref={this.refC} className="step-name">Step 3:</p>
                                                              <p ref={this.refC} className="common-titles">INTERNAL CONTACTS</p>

                                                              <p className="common-titles-info">Give your colleagues someone to talk to for specific questions. You can add up to two people for each role.</p>

                                                              <p className="tool-tip common-titles-info" data-tip data-for='Step 3'>What should I put here?</p>


                                                              <ReactTooltip className="customeTheme" id='Step 3' place="bottom" effect="solid" type="light">

                                                                  <p className="tool-tip-title">Practice Manager<span className="asterisks">*</span></p>
                                                                  <p className="tool-tip-desc">Person to answer broader questions in your cell, can be the practice/service line manager and/or content manager</p>
                                                                  <p className="tool-tip-title">Service Line or Domain Leader</p>
                                                                  <p className="tool-tip-desc">Leading partner of the service line or domain that owns this asset.</p>
                                                                  <p className="tool-tip-title">Expert</p>
                                                                  <p className="tool-tip-desc">This person can be an expert with subject matter expertise in your domain to answer content related questions.</p>
                                                                  <p className="tool-tip-title">Research</p>
                                                                  <p className="tool-tip-desc">This person can be the research first alert in your domain to help with research in your topic.</p>


                                                              </ReactTooltip>
                                                           </div>
                                                          <div className="col-md-8 actualContentPerSection"><Form.Label className="firstFieldLabel">Practice Manager<span className="asterisks">&#42;</span></Form.Label><span className="firstFieldValidation">{this.state.practiceManager.length}/2</span>
                                                                                                                        <Form.Control className="rectangle submissionInput" type="text" name="practiceManager" value={this.state.practiceManagerSearch} autoComplete="off" defaultValue="" placeholder="Type and select a colleague's name" onChange={this.getPersonAutosuggestList} required />
                                                                                                                        <Form.Control.Feedback type="invalid">
                                                                                                                            This field is required
                                                                                                                            </Form.Control.Feedback>

                                                                                                                            {this.state.practiceManagerError.length !== 0 ? (<p className="api-error"> {this.state.practiceManagerError}</p>)
                                                                                                                                                                                                            :
                                                                                                                        (this.state.personAutosuggestList.length === 0 ? ('') : (<p className="autosuggest-para">
                                                                                                                            {
                                                                                                                                this.state.personAutosuggestList.map(option => (
                                                                                                                                    <p onClick={() => this.selectedOption(option, "PracticeManager")} key={option.fmno}> {option.preferred_name + ' ' + option.last_name}</p>

                                                                                                                                ))

                                                                                                                            }
                                                                                                                        </p>))}


                                                                                                                        <div className="autosuggest-selected-items">
                                                                                                                            {
                                                                                                                                this.state.practiceManager.map((manager, index) => (
                                                                                                                                    <div className="selected-item">
                                                                                                                                         <span className="circular"> <img className="image" src={EXTERNAL_ASSETS + "/person/fmno_photos/" + manager.assetTeamContactFmno + "/thumb.jpg?dummy=allowed"} alt="person logo" ></img></span>
                                                                                                                                        <span className="name">{manager.assetTeamContactFullName}</span>
                                                                                                                                        <img className="close" src={Icon_CloseCircle} alt="person logo" onClick={() => this.removePracticeManager(index)}></img>

                                                                                                                                    </div>
                                                                                                                                ))
                                                                                                                            }
                                                                                                                        </div>


                                                                                                                        
                                                                                                                        <Form.Label className="subheadings">Service Line or Domain Leader </Form.Label><span className="list-validation">{this.state.serviceLineManager.length}/2</span>
                                                                                                                        <Form.Control className="rectangle submissionInput" type="text" name="serviceLine" value={this.state.serviceLine} autoComplete="off" defaultValue="" placeholder="Type and select a colleague's name" onChange={this.getPersonAutosuggestListServiceLine} />

                                                                                                                        {this.state.serviceLineManagerError.length !== 0 ? (<p className="api-error"> {this.state.serviceLineManagerError}</p>)
                                                                                                                             :

                                                                                                                        (this.state.personAutosuggestList_serviceLine.length === 0 ? ('') : (
                                                                                                                            <p className="autosuggest-para">
                                                                                                                                {
                                                                                                                                    this.state.personAutosuggestList_serviceLine.map(option => (
                                                                                                                                        <p onClick={() => this.selectedOption(option, "ServiceLineLeader")} key={option.fmno}> {option.preferred_name + ' ' + option.last_name}</p>

                                                                                                                                    ))

                                                                                                                                }
                                                                                                                            </p>)
                                                                                                                        )}

                                                                                                                       <div className="autosuggest-selected-items">
                                                                                                                            {
                                                                                                                                this.state.serviceLineManager.map((manager, index) => (
                                                                                                                                    <div className="selected-item">
                                                                                                                                         <span className="circular"> <img className="image" src={EXTERNAL_ASSETS + "/person/fmno_photos/" + manager.assetTeamContactFmno + "/thumb.jpg?dummy=allowed"} alt="person logo" ></img></span>
                                                                                                                                        <span className="name">{manager.assetTeamContactFullName}</span>
                                                                                                                                        <img className="close" src={Icon_CloseCircle} alt="Smiley face"  onClick={() => this.removeServiceManager(index)}></img>
                                                                                                                                    </div>
                                                                                                                                ))
                                                                                                                            }

                                                                                                                        </div>


                                                                                                                        
                                                                                                                        <Form.Label className="subheadings">Expert</Form.Label><span className="list-validation">{this.state.expertManager.length}/2</span>
                                                                                                                        <Form.Control className="rectangle submissionInput" type="text" name="expert" value={expert} autoComplete="off" defaultValue="" placeholder="Type and select a colleague's name" onChange={this.getPersonAutosuggestListExpert} />
                                                                                                                        {this.state.expertManagerError.length !== 0 ? (<p className="api-error"> {this.state.expertManagerError}</p>)
                                                                                                                                                                 :

                                                                                                                        (this.state.personAutosuggestList_expert.length === 0 ? ('') : (
                                                                                                                            <p className="autosuggest-para">
                                                                                                                                {
                                                                                                                                    this.state.personAutosuggestList_expert.map(option => (
                                                                                                                                        <p onClick={() => this.selectedOption(option, "Expert")} key={option.fmno}> {option.preferred_name + ' ' + option.last_name}</p>

                                                                                                                                    ))

                                                                                                                                }
                                                                                                                            </p>)
                                                                                                                        )}

                                                                                                                        <div className="autosuggest-selected-items">
                                                                                                                            {
                                                                                                                                this.state.expertManager.map((manager, index) => (
                                                                                                                                    <div className="selected-item">
                                                                                                                                        <span className="circular"> <img className="image" src={EXTERNAL_ASSETS + "/person/fmno_photos/" + manager.assetTeamContactFmno + "/thumb.jpg?dummy=allowed"} alt="person logo" ></img></span>
                                                                                                                                       <span className="name">{manager.assetTeamContactFullName}</span>
                                                                                                                                       <img className="close" src={Icon_CloseCircle} alt="Smiley face"  onClick={() => this.removeExpertManager(index)}></img>

                                                                                                                                    </div>
                                                                                                                                ))
                                                                                                                            }

                                                                                                                        </div>

                                                                                                                        
                                                                                                                        <Form.Label className="subheadings">Research Team</Form.Label><span className="list-validation">{this.state.researchTeamManager.length}/2</span>
                                                                                                                        <Form.Control className="rectangle submissionInput" type="text" name="researchTeam" value={researchTeam} autoComplete="off" defaultValue="" placeholder="Type and select a colleague's name" onChange={this.getPersonAutosuggestListResearchTeam} />

                                                                                                                        {this.state.researchTeamManagerError.length !== 0 ? (<p className="api-error"> {this.state.researchTeamManagerError}</p>)
                                                                                                                                                                                                     :
                                                                                                                        (this.state.personAutosuggestList_researchTeam.length === 0 ? ('') : (
                                                                                                                            <p className="autosuggest-para">
                                                                                                                                {
                                                                                                                                    this.state.personAutosuggestList_researchTeam.map(option => (
                                                                                                                                        <p onClick={() => this.selectedOption(option, "ResearchTeam")} key={option.fmno}> {option.preferred_name + ' ' + option.last_name}</p>

                                                                                                                                    ))

                                                                                                                                }
                                                                                                                            </p>)
                                                                                                                        )}
                                                                                                                        <div className="autosuggest-selected-items">
                                                                                                                            {
                                                                                                                                this.state.researchTeamManager.map((manager, index) => (
                                                                                                                                    <div className="selected-item">
                                                                                                                                    <span className="circular"> <img className="image"src={EXTERNAL_ASSETS + "/person/fmno_photos/" + manager.assetTeamContactFmno + "/thumb.jpg?dummy=allowed"} alt="person logo" ></img></span>
                                                                                                                                       
                                                                                                                                         <span className="name">{manager.assetTeamContactFullName}</span>
                                                                                                                                         <img className="close" src={Icon_CloseCircle} alt="Smiley face"  onClick={() => this.removeReSearchTeamManager(index)}></img>

                                                                                                                                    </div>
                                                                                                                                ))
                                                                                                                            }

                                                                                                                        </div>
                                                                                                                        </div>

                            </div>
                            <hr />

                            <div className="row">
                                <div className="col-md-4 descTextPerSection">
                                              <p ref={this.refD} className="step-name">Step 4:</p>
                                              <p ref={this.refD} className="common-titles">READY-TO-USE MATERIALS</p>
                                              <p className="common-titles-info">Give your colleagues extra materials to bring into presentations and represent your asset to others.</p>
                                 </div>
                                <div className="col-md-8 actualContentPerSection">
                                                  <Form.Label className="firstFieldLabel">LOP Pages<span className="asterisks">&#42;</span></Form.Label>
                                                  <Form.Control className="rectangle submissionInput" type="text" name="lopPagesSearch" value={lopPagesSearch} autoComplete="off" defaultValue="" placeholder="Type a Know ID" onChange={this.getLopPagesAutoSuggest.bind(this)} required />
                                                  <Form.Control.Feedback type="invalid">
                                                      This field is required
                                                      </Form.Control.Feedback>
                                                  {this.state.lopresponseError === '' ? ({
                                                      ...this.state.lopPages.length === 0 ? (<div></div>) : (
                                                          <p className="autosuggest-para">
                                                              {
                                                                  this.state.lopPages.map(option => (
                                                                      <p onClick={() => this.selectedOption(option, "SmartLop")} key={option.id}> {option.title}</p>

                                                                  ))

                                                              }
                                                          </p>)
                                                  }) : (<p className="api-error" > {this.state.lopresponseError}</p>)}




                                                   <div className="autosuggest-selected-items">
                                                      {
                                                          this.state.lopPagesManager.map((manager, index) => (
                                                              <div className="selected-item">
                                                                  <span className="name">{manager.taggedDocTitle}</span>
                                                                  <img className="close" src={Icon_CloseCircle} alt="person logo"  onClick={() => this.removeLopPagesManager(index)}></img>

                                                              </div>
                                                          ))
                                                      }

                                                  </div>






                                                  
                                                  <Form.Label className="subheadings">Client Impact Cases</Form.Label>
                                                  <Form.Control className="rectangle submissionInput" type="text" name="clientImpactCasesSearch" value={clientImpactCasesSearch} autoComplete="off" defaultValue="" placeholder="Type a Know ID" onChange={this.getClientImpactCasesAutoSuggest.bind(this)} />
                                                  {this.state.clientImpactCasesError === '' ? ({
                                                      ...this.state.clientImpactCases.length === 0 ? (<div></div>) : (
                                                          <p className="autosuggest-para">
                                                              {
                                                                  this.state.clientImpactCases.map(option => (
                                                                      <p onClick={() => this.selectedOption(option, "ClientImpactCase")} key={option.id}> {option.title}</p>

                                                                  ))

                                                              }
                                                          </p>)
                                                  }
                                                  ) : (<p className="api-error" >{this.state.clientImpactCasesError}</p>)}




                                                   <div className="autosuggest-selected-items">
                                                      {
                                                          this.state.clientImpactCasesManager.map((manager, index) => (
                                                              <div className="selected-item">
                                                                  <span className="name">{manager.taggedDocTitle}</span>
                                                                  <img className="close" src={Icon_CloseCircle} alt="person logo"  onClick={() => this.removeClientImpactCases(index)}></img>
                                                              </div>
                                                          ))
                                                      }

                                                  </div>



                                                  
                                                  <Form.Label className="subheadings">Sample Outputs</Form.Label>
                                                  <Form.Control className="rectangle submissionInput" type="text" name="sampleOutputsSearch" value={sampleOutputsSearch} autoComplete="off" defaultValue="" placeholder="Type a Know ID" onChange={this.getSampleOutputsAutoSuggest.bind(this)} />
                                                  {this.state.sampleOutputsError === '' ? ({
                                                      ...this.state.sampleOutputs.length === 0 ? (<div></div>) : (
                                                          <p className="autosuggest-para">
                                                              {
                                                                  this.state.sampleOutputs.map(option => (
                                                                      <p onClick={() => this.selectedOption(option, "SampleOutput")} key={option.id}> {option.title}</p>

                                                                  ))

                                                              }
                                                          </p>)
                                                  }) : (<p className="api-error" >{this.state.sampleOutputsError}</p>)}




                                                  <div className="autosuggest-selected-items">
                                                      {
                                                          this.state.sampleOutputsManager.map((manager, index) => (
                                                              <div className="selected-item">
                                                                  <span className="name">{manager.taggedDocTitle}</span>
                                                                  <img className="close" src={Icon_CloseCircle} alt="person logo"  onClick={() => this.removeSampleOutputs(index)}></img>

                                                              </div>
                                                          ))
                                                      }

                                                  </div>




                                                  
                                                  <Form.Label className="subheadings">EM Guide</Form.Label>
                                                  <Form.Control className="rectangle submissionInput" type="text" name="emGuideSearch" value={emGuideSearch} autoComplete="off" defaultValue="" placeholder="Type a Know ID" onChange={this.getEmGuideAutoSuggest.bind(this)} />
                                                  {this.state.emGuideError === '' ? ({
                                                      ...this.state.emGuide.length === 0 ? (<div></div>) : (
                                                          <p className="autosuggest-para">
                                                              {
                                                                  this.state.emGuide.map(option => (
                                                                      <p onClick={() => this.selectedOption(option, "EMGuide")} key={option.id}> {option.title}</p>

                                                                  ))

                                                              }
                                                          </p>)
                                                  }) : (<p className="api-error" >{this.state.emGuideError}</p>)}






                                                 <div className="autosuggest-selected-items">
                                                      {
                                                          this.state.emGuideManager.map((manager, index) => (
                                                               <div className="selected-item">
                                                                  <span className="name">{manager.taggedDocTitle}</span>
                                                                  <img className="close" src={Icon_CloseCircle} alt="person logo"  onClick={() => this.removeEmGuides(index)}></img>

                                                              </div>
                                                          ))
                                                      }

                                                  </div>






                                                  
                                                  <Form.Label className="subheadings">Demo Video</Form.Label>
                                                  <Form.Control className="rectangle submissionInput" type="text" name="demoVideoSearch" value={demoVideoSearch} autoComplete="off" defaultValue="" placeholder="Type a KnowNOW video title" onChange={this.getDemoVideoAutoSuggest.bind(this)} />


                                                  {this.state.demoVideoError === '' ? ({
                                                      ...this.state.demoVideo.length === 0 ? (<div></div>) : (
                                                          <p className="autosuggest-para">
                                                              {
                                                                  this.state.demoVideo.map(option => (
                                                                      <p onClick={() => this.selectedOption(option, "KnowNow")} key={option.id}> {option.title}</p>
                                                                  ))
                                                              }
                                                          </p>)
                                                  }) : (<p className="api-error" >{this.state.demoVideoError}</p>)}




                                                   <div className="autosuggest-selected-items">
                                                      {
                                                          this.state.demoVideoManager.map((manager, index) => (
                                                              <div className="selected-item">
                                                                  <span className="name">{manager.taggedDocTitle}</span>
                                                                  <img className="close" src={Icon_CloseCircle} alt="person logo"  onClick={() => this.removeDemoVideo(index)}></img>

                                                              </div>
                                                          ))
                                                      }

                                                  </div>
                                            </div>
                            </div>

                            <hr />
                            <div className="row">
                                    <div className="col-md-4 descTextPerSection">
                                          <p ref={this.refE} className="step-name">Step 5:</p>
                                          <p ref={this.refE} className="common-titles">DEPLOYMENT MODEL</p>

                                          <p className="common-titles-info">Set expectations for what it will take to deploy this asset for a client.</p>
                                          <p className="tool-tip common-titles-info" data-tip data-for='Step 5'>What should I put here?</p>

                                          <ReactTooltip className="customeTheme" id='Step 5' place="bottom" effect="solid" type="light">
                                              <p className="tool-tip-title">Timeline</p>
                                              <p className="tool-tip-desc">How many weeks will it take for each stage of the process (e.g., tool configuration, data collection, processing, analysis etc.)?</p>
                                              <p className="tool-tip-title">Resourcing</p>
                                              <p className="tool-tip-desc">Can the team deploy this asset on their own or do they need someone from the asset team? If yes, how many people and what profiles from the Asset team should they be expecting?</p>
                                              <p className="tool-tip-title">Costs</p>
                                              <p className="tool-tip-desc">How much does this typically cost (e.g., fixed fee + variable cost depending on XYZ)?</p>
                                          </ReactTooltip>
                                    </div>
                                    <div className="col-md-8 actualContentPerSection">
                                          <Form.Label className="firstFieldLabel">Timeline<span className="asterisks">&#42;</span></Form.Label><span className="firstField rich-text-list-validation">{this.state.timeline.replace(/(<([^>]+)>)/ig, '').length}/200 characters</span>
                                          <SummaryBox id="counttxt-timeline" errclassname={this.state.isTimelineEmpty ? "rich-text-red-border" : ""} type="text" required={true} defaultValue={timeline} placeholder="Describe the typical timeline when deploying this asset..." onChange={this.changeHandlerEditor} maxLength={200} error={""} name={timeline} value={timeline} />
                                          {/*<Form.Control as="textarea" className="rectangle-big" type="text" name="timeline" value={timeline} autoComplete="off" defaultValue="" placeholder="Describe the typical timeline when deploying this asset..." onChange={this.changeHandler} required />*/}
                                          {this.state.isTimelineEmpty ? ( <div className="rich-text-invalid-feedback">This field is required </div>):('')}
                                          
                                          <Form.Label className="subheadings">Resourcing<span className="asterisks">&#42;</span></Form.Label><span className="rich-text-list-validation">{this.state.resourcing.replace(/(<([^>]+)>)/ig, '').length}/200 characters</span>
                                          <SummaryBox id="counttxt-resourcing" errclassname={this.state.isResourcingEmpty ? "rich-text-red-border" : ""} type="text" required={true} defaultValue={resourcing} placeholder="Describe the typical staffing requirement to deploy this asset properly..." onChange={this.changeHandlerEditor} maxLength={200} error={""} name={resourcing} value={resourcing} />
                                          {/*<Form.Control as="textarea" className="rectangle-big" type="text" name="resourcing" value={resourcing} autoComplete="off" defaultValue="" placeholder="Describe the typical staffing requirement to deploy this asset properly..." onChange={this.changeHandler} required />*/}
                                          {this.state.isResourcingEmpty ? ( <div className="rich-text-invalid-feedback">This field is required </div>):('')}
                                          
                                          <Form.Label className="subheadings">Cost<span className="asterisks">&#42;</span></Form.Label><span className="rich-text-list-validation">{this.state.cost.replace(/(<([^>]+)>)/ig, '').length}/200 characters</span>
                                          <SummaryBox id="counttxt-cost" errclassname={this.state.isCostEmpty ? "rich-text-red-border" : ""} type="text" required={true} defaultValue={cost} placeholder="Describe the cost range of deploying this asset..." onChange={this.changeHandlerEditor} maxLength={200} error={""} name={cost} value={cost} />
                                          {/*<Form.Control as="textarea" className="rectangle-big" type="text" name="cost" value={cost} autoComplete="off" defaultValue="" placeholder="Describe the cost range of deploying this asset..." onChange={this.changeHandler} required />
                                          */}
                                          
                                          {this.state.isCostEmpty ? ( <div className="rich-text-invalid-feedback">This field is required </div>):('')}

                                    </div>
                             </div>
                            <hr />

                            <div className="row">
                                 <div className="col-md-4 descTextPerSection">
                                    <p  className="step-name">Step 6:</p>
                                    <p  className="common-titles">TECHNOLOGY DETAILS</p>
                                    <p className="common-titles-info">Help your colleagues think about technical feasibility within the client context. For example, what are tech stack, hosting options, data security classification, and region of data storage?</p>
                                 </div>
                                 <div className="col-md-8 actualContentPerSection">
                                 <Form.Label className="firstFieldLabel">Description</Form.Label><span className="firstField rich-text-list-validation">{this.state.technologyDescription.replace(/(<([^>]+)>)/ig, '').length}/200 characters</span>
                                   <SummaryBox id="counttxt-techdescription" defaultValue={technologyDescription} type="text" required={false} placeholder="Briefly describe the technology requirements to deploy this asset properly..." onChange={this.changeHandlerEditor} maxLength={200} error={""} name={technologyDescription} value={technologyDescription} />
                                   {/*
                                       <Form.Control as="textarea" className="rectangle-big" type="text" name="technologyDescription" value={technologyDescription} autoComplete="off" defaultValue="" placeholder="Briefly describe the technology requirements to deploy this asset properly..." onChange={this.changeHandler} required />
                                       */}
                                 </div>
                             </div>

                            <hr />

                            <div className="row lastStep">
                                 <div className="col-md-4 descTextPerSection">
                                     <p className="step-name">Step 7:</p>
                                    <p  ref={this.refF} className="common-titles">ADDITIONAL INFORMATION</p>
                                    <p className="common-titles-info">Extra ways for a curious colleague to learn more.</p>
                                 </div>
                                 <div className="col-md-8 actualContentPerSection">
                                     <Form.Label className="firstFieldLabel">Asset Website</Form.Label>
                                     <Form.Control type="text" className="rectangle submissionInput" type="text" name="assetWebsite" value={assetWebsite} autoComplete="off" defaultValue="" placeholder="Enter your asset URL" onChange={this.changeHandler} />

                                     
                                     <Form.Label className="subheadings">Asset Email Address</Form.Label>
                                     <Form.Control type="text"  className="rectangle submissionInput" type="text" name="assetEmailAddress" value={assetEmailAddress} autoComplete="off" defaultValue="" placeholder="Enter your asset email address" onChange={this.changeHandler} />
                                 </div>
                             </div>

                        <DeleteConfirmation
                            show={this.state.deleteDraft}
                            onHide={deleteClose}
                            deletepayload={this.getDeleteCallData()}
                            assetType='large'
                        />
                        <CancelConfirmation
                            show={this.state.cancelForm}
                            onHide={cancelClose}
                            data={this.getSaveDraftData()}
                        />
                        <Confirmation
                            show={this.state.confirmPopUp}
                            onHide={continueWorking}
                            data={this.getFinalDataSubmit()}
                        />

                        
                    <Footer callback={this.footerCallback} id={this.state.assetID}  editCall={this.props.editCall} />
                    </Form>
                   
                </div>
                
            </div>
        );
    }
}

export default Assetsubmission;
