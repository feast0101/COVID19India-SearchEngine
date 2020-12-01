import React from 'react';
import './PreviewAsset.scss';
import PreviewFooter from './previewfooter/PreviewFooter';
import DraftSubmit from './draftsubmit/DraftSubmit';
import { SAVE_ASSET } from '../../../config/config';
import axios, { post } from 'axios';
import { ENGAGEMENT_TOP_RESULTS } from '../../../config/config';
import AjaxWrapper from '../../../api/AjaxWrapper';
import Loader from '../../../assets/images/loader.gif';
import MailIcon from "../../../assets/images/Icon_Email.svg";

class PreviewAsset extends React.Component {
    refSubmit = React.createRef()
    constructor(props) {
        super(props);
        this.state = {

            topEngagements: [],
            topEngagementsError: '',
            totalCount: '',
            errorSubmit: '',
            deparmentCode: '',
        }


    }


    getSaveDraftData() {

        var date = new Date();
        //var lastUpdate = date.toLocaleDateString("default", {month: "short", year: "numeric", day: "numeric"})
        var lastUpdate = date.getUTCFullYear() + '/' + date.getUTCMonth() + "/" + date.getUTCDate();

        const data = new FormData();

        data.append('file', this.props.data.file);

        const obj = {
            status: "Draft",
            assetType: "LargeAsset",
            docType: "nvt:asset",
            assetID: this.props.data.assetID,
            assetName: this.props.data.assetName,
            assetDepartmentCodeManager: this.props.data.assetDepartmentCodeManager,
            assetDescription: this.props.data.assetDescription,
            assetEmailAddress: this.props.data.assetEmailAddress,
            assetTeamLeaderManager: this.props.data.assetTeamLeaderManager,
            assetWebsite: this.props.data.assetWebsite,
            clientImpactCasesManager: this.props.data.clientImpactCasesManager,
            cost: this.props.data.cost,
            demoVideoManager: this.props.data.demoVideoManager,
            emGuideManager: this.props.data.emGuideManager,
            expertManager: this.props.data.expertManager,
            lopPagesManager: this.props.data.lopPagesManager,
            otherOwningPracticeManager: this.props.data.otherOwningPracticeManager,
            owningPracticeManager: this.props.data.owningPracticeManager,
            practiceManager: this.props.data.practiceManager,
            researchTeamManager: this.props.data.researchTeamManager,
            resourcing: this.props.data.resourcing,
            sampleOutputsManager: this.props.data.sampleOutputsManager,
            searchResultDescription: this.props.data.searchResultDescription,
            serviceLineManager: this.props.data.serviceLineManager,
            technologyDescription: this.props.data.technologyDescription,
            timeline: this.props.data.timeline,
            useCases: this.props.data.useCases,
            base64URl: this.props.data.base64URl,
            lastUpdate: lastUpdate,
            assetImageName: this.props.data.file === null ? ('') : this.props.data.file.name
        };


        data.append('docMetadata', new Blob([JSON.stringify(obj)], { type: 'application/json' }));


        return data;

    }

    footerCallback = (nav, e) => {

        if (nav === 'Close') {
            this.props.closeCallback();
        } else if (nav === 'SaveDraft') {
            this.onSaveDraft()
        }
    }

    onSaveDraft() {
        //		this.setState({
        //                    showDraft: true,
        //                })

        //                let elRef = null;
        //                elRef = this.refSubmit;
        //                const el = elRef.current ? elRef.current : elRef
        //                // Scroll the element into view
        //                el.scrollIntoView({
        //                    behavior: 'smooth',
        //                    block: 'start',
        //
        //                })

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.saveData(this.getSaveDraftData());
        //alert('onSaveDraft');
        //alert('onSaveDraft');
    }

    saveData(data) {

        post(SAVE_ASSET, data).then(response => this.setState({
            showDraft: true,
            assetID: response.data.assetId,
            assetNodeRef: response.data.nodeRef,
            errorSubmit: false

        })).then((assetID) => {
            if (this.state.assetID !== '') {
                this.setState({
                    showDraft: true,
                })
                setTimeout(function () { //Start the timer
                    this.setState({ showDraft: false }) //After 2 second, set render to true
                }.bind(this), 2000)
            }
        }).catch((error) => {
            this.setState({
                showDraft: false,
                errorSubmit: true,
            })
            setTimeout(function () { //Start the timer
                this.setState({ errorSubmit: false, showDraft: false }) //After 2 second, set render to true
            }.bind(this), 2000)

        });



    }

    componentWillMount() {
        //        var banner = document.getElementById("legacy-knowTab");
        //        banner.style.display = "none";

        let parameters = "";
        this.props.data.assetDepartmentCodeManager.map(option => (
            parameters += option.id + ","
        ))

        if (parameters !== "") {

            this.setState({
                deparmentCode: parameters,
                loader: true,

            })

            AjaxWrapper.get((ENGAGEMENT_TOP_RESULTS + parameters.substring(0, parameters.length - 1)).replace(/\s/g, "") + "&allEngagements=false").then(res => {
                if (res.apiError) {
                    //console.log(res)

                    this.setState({
                        topEngagementsError: "Oops! Something went wrong in fetching engagements",
                        loader: false
                    });


                } else {
                    this.setState({
                        topEngagements: res.response.engagementDetails,
                        totalCount: res.response.count,
                        loader: false
                    });
                }

            })

        } else {
            this.setState({
                loader: false
            })
        }
    }


    render() {


        console.log({

            status: "Submitted",
            assetID: this.props.data.assetID,

            assetName: this.props.data.assetName,
            assetDepartmentCodeManager: this.props.data.assetDepartmentCodeManager,
            assetDescription: this.props.data.assetDescription,
            assetEmailAddress: this.props.data.assetEmailAddress,
            assetTeamLeaderManager: this.props.data.assetTeamLeaderManager,
            assetWebsite: this.props.data.assetWebsite,
            clientImpactCasesManager: this.props.data.clientImpactCasesManager,
            cost: this.props.data.cost,
            demoVideoManager: this.props.data.demoVideoManager,
            emGuideManager: this.props.data.emGuideManager,
            expertManager: this.props.data.expertManager,
            file: this.props.data.file,
            lopPagesManager: this.props.data.lopPagesManager,
            otherOwningPracticeManager: this.props.data.otherOwningPracticeManager,
            owningPracticeManager: this.props.data.owningPracticeManager,
            practiceManager: this.props.data.practiceManager,
            researchTeamManager: this.props.data.researchTeamManager,
            resourcing: this.props.data.resourcing,
            sampleOutputsManager: this.props.data.sampleOutputsManager,
            searchResultDescription: this.props.data.searchResultDescription,
            serviceLineManager: this.props.data.serviceLineManager,
            technologyDescription: this.props.data.technologyDescription,
            timeline: this.props.data.timeline,
            useCases: this.props.data.useCases,
            base64URl: this.props.data.base64URl,
            lastUpdate: this.props.data.lastUpdate,
            lastUpdate: this.props.data.lastUpdate,
            assetImageName: this.props.data.imageName,
            assetDepartmentCodeResponse: this.props.data.assetDepartmentCodeResponse


        });
        return (
            <div>
            <PreviewFooter callback={this.footerCallback} editCall={this.props.editCall}/>
            <div className="main-class" ref={this.refSubmit}>
               
                {this.state.showDraft ? <DraftSubmit /> : <div></div>}
                {this.state.errorSubmit ? (<div className="error-confirm"><p className="err-text-confirm">Something went wrong. Please try after sometime.</p></div>) : ('')}
                <div className="previewHeaderContainer summaryHeaderContainer">
                    <div className="previewHeader summaryHeader">

                        {this.props.data.base64URl != "" && 
                            <div className="logoImage">
                                <img alt="" src={this.props.data.base64URl}></img>
                            </div>
                        }
                        
                            <div className="assetTitle">{this.props.data.assetName}
                            <p className="owningPractice">Practice: {this.props.data.owningPracticeManager.length === 0 ? '' : this.props.data.owningPracticeManager[0].description}</p>
                            </div>
                    </div>
                </div>
                <div className="summaryBody">
                    <div className="leftPanel">
                        <div className="leftPanelFirst">
                            <div className="leftPanelDesc">
                                <p className="description">DESCRIPTION</p>
                                <p className="descriptionText" dangerouslySetInnerHTML={{ __html: this.props.data.assetDescription }} />
                            </div>
                            <div className="rightPanelGetHelp">
                                <p className="getHelpText">GET HELP</p>
                                {

                                    this.props.data.assetTeamLeaderManager.map(option => (
                                        <div className="firstAlertWrapper">
                                            <span className="circular"><img src={option.image} alt="" /></span>

                                            <div class="firstAlert"><span class="firstAlertName">{option.assetTeamContactFullName}</span><span class="assetLeader">{option.assetTeamContactType}</span></div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="leftPanelSecond">
                            <div className="leftPanelUseCases">
                                <div className="commonUseCases">COMMON USE CASES</div>
                                {
                                    this.props.data.useCases.map(option => (

                                        <div className="useCaseList">
                                            <div className="useCaseTitle">{option.assetUseCaseTitle}</div>
                                            <div className="useCaseDesc">
                                                <p dangerouslySetInnerHTML={{ __html: option.assetUseCaseDesc}}>
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="leftPanelThird">
                            <div className="internalContactWrapper">
                                <div className="internalContactsText">INTERNAL CONTACTS</div>

                                {
                                    this.props.data.internalContactParentList.map(option => (
                                        option.Contact_type === "FirstAlert" ? (<div></div>) : (<div className="internalContactList">
                                            <div className="internalContactList">
                                            <div className="intenalContactImage">
                                                <span className="circular"><img src={option.image} alt="" /></span>
                                            </div>
                                                <div class="internalContactDtls"><div class="leader-name internalContactName">{option.name}</div>
                                                <div class="leader-designation internalContactRole">{option.Contact_type}</div></div>
                                            </div>
                                        </div>)

                                    )

                                    )
                                }
                            </div>
                        </div>
                        {this.state.deparmentCode === "" ? (<div></div>) : (<div className="leftPanelFour">
                            {this.state.topEngagementsError !== '' ? (<p className="api-error-preview"> {this.state.topEngagementsError} </p>) : (
                                <div>
                                    <div className="engagementHeader">
                                        RECENT ENGAGEMENTS<span className="engagementCount">
                                            {this.state.totalCount}
                                        </span>
                                    </div>
                                    {this.state.topEngagements.length > 0 ? (
                                        <div className="engagementList">

                                            {this.state.topEngagements.map(option => (
                                                <div>
                                                    <div className="engagamentTitle">
                                                        {option.engagementTitle}
                                                    </div>
                                                    <div className="engagementDuration">
                                                        {option.engagementStart + " - " + option.engagementEnd}
                                                    </div>
                                                    <div className="engagementDesc">
                                                        {option.industryPractice + "," + option.functionalPractice}
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="seeMore" >
                                                <a target="_blank" rel="noopener noreferrer" className="seeMore" href={`/ksassetfe/asset/allEngagements/${this.state.deparmentCode}`}>
                                                    See More</a>
                                            </div>
                                        </div>

                                    ) : (this.state.loader ? (<img alt="" className="logoImage" src={Loader}></img>) : (this.state.totalCount === 0 && <p>No Records found</p>))}

                                </div>)}

                        </div>)}

                        {this.props.data.timeline !== "" || this.props.data.resourcing !== "" || this.props.data.cost !== "" || this.props.data.technologyDescription !== "" ? (
                            <div className="leftPanelFive">

                                {this.props.data.timeline !== "" || this.props.data.resourcing !== "" || this.props.data.cost !== "" ? (
                                    <div className="leftPanelOthers">
                                        <div className="deploymentModel">
                                            DEPLOYMENT MODEL
                            </div>
                                        {this.props.data.timeline !== "" ? (<div><div className="timingHeader">
                                            Timing
                                                                                            </div>
                                            <div className="timingText" dangerouslySetInnerHTML={{ __html: this.props.data.timeline }}>
                                            </div></div>) : (<div></div>)}
                                        {this.props.data.resourcing !== "" ? (<div><div className="resourcingHeader">
                                            Resourcing
                                                                                                                        </div>
                                            <div className="resourcingText" dangerouslySetInnerHTML={{ __html: this.props.data.resourcing }}>
                                            </div></div>) : (<div></div>)}
                                        {this.props.data.cost !== "" ? (<div><div className="costHeader">
                                            Costs
                                                                                                                                                    </div>
                                            <div className="costText" dangerouslySetInnerHTML={{ __html: this.props.data.cost }}>
                                            </div></div>) : (<div></div>)}
                                    </div>) : (<div></div>)}


                                {this.props.data.technologyDescription !== "" ? (<div className="rightPanelOther">
                                    <div className="technologyInformation">
                                        TECHNOLOGY INFORMATION
                                                 								</div>
                                    <div className="technologyInfoText" dangerouslySetInnerHTML={{ __html: this.props.data.technologyDescription }}>
                                    </div>
                                </div>) : (<div></div>)
                                }
                            </div>) : (<div></div>)}
                    </div>
                    <div className="rightSection">
                        <div className="lastUpdated">Last updated: {this.props.data.lastUpdate}</div>
                        <div className="rightPanel" >
                            <div className="readyToUseMateria">READY-TO-USE MATERIALS</div>
                            <div className="DocumentCategory">LOP Pages</div>

                            {this.props.data.lopPagesManager.length === 0 ? (<div></div>) : (
                                <div>
                                    {this.props.data.lopPagesManager.map(option => (
                                        <div className="attachmentDtls">
                                            <a target="_blank" rel="noopener noreferrer" class="attachmentlnk" href={`/ks/research/summary/document?id=${option.taggedDocId}`}>{option.taggedDocTitle}</a>
                                            <hr />
                                        </div>
                                    ))}

                                </div>
                            )}
                            {this.props.data.clientImpactCasesManager.length === 0 ? (<div></div>) : (
                                <div>
                                    <div className="DocumentCategory">Client Impact Cases</div>
                                    {this.props.data.clientImpactCasesManager.map(option => (
                                        <div className="attachmentDtls">
                                            <a target="_blank" rel="noopener noreferrer" class="attachmentlnk" href={`/ks/research/summary/document?id=${option.taggedDocId}`}>{option.taggedDocTitle}</a>
                                            <hr />
                                        </div>
                                    ))}

                                </div>
                            )}
                            {this.props.data.sampleOutputsManager.length === 0 ? (<div></div>) : (
                                <div>
                                    <div className="DocumentCategory">Sample outputs</div>
                                    {this.props.data.sampleOutputsManager.map(option => (
                                        <div className="attachmentDtls">
                                            <a target="_blank" rel="noopener noreferrer" class="attachmentlnk" href={`/ks/research/summary/document?id=${option.taggedDocId}`}>{option.taggedDocTitle}</a>
                                            <hr />
                                        </div>
                                    ))}

                                </div>
                            )}

                            {this.props.data.emGuideManager.length === 0 ? (<div></div>) : (
                                <div>
                                    <div className="DocumentCategory">EM guide</div>
                                    {this.props.data.emGuideManager.map(option => (
                                        <div className="attachmentDtls">
                                            <a target="_blank" rel="noopener noreferrer" class="attachmentlnk" href={`/ks/research/summary/document?id=${option.taggedDocId}`}>{option.taggedDocTitle}</a>
                                            <hr />
                                        </div>
                                    ))}

                                </div>
                            )}
                            {this.props.data.demoVideoResponse === null ? (<div></div>) : (

                                <div>
                                    <div className="divider" />
                                    <div className="demoVideo">DEMO VIDEO</div>
                                    <div className="videoContent">
                                        <img alt="" className="demo video thumbnail" src={this.props.data.demoVideoResponse && this.props.data.demoVideoResponse.docs ? this.props.data.demoVideoResponse.docs[0].thumbnail : ''}></img>
                                    </div>
                                </div>)}
                            {this.props.data.assetEmailAddress !== '' || this.props.data.assetWebsite !== '' ? (<div><div className="divider" />
                                <div className="additionalInfo">ADDITIONAL INFORMATION</div></div>) : ('')}

                            {this.props.data.assetEmailAddress !== '' ? (

                                <div className="emailUsBox">
                                    <div className="emailUs">
                                        <a className="groupEmail" key="group_email" href={"mailto:" + this.props.data.assetEmailAddress + "?subject=" + "Asset Library | Question about " + this.props.data.assetName}>
                                            <img alt="" src={MailIcon} />
                                            <div className="emailText">Email Us</div>
                                        </a>
                                    </div>
                                </div>
                            ) : ('')}

                            {this.props.data.assetWebsite !== '' ? (
                                <div className="visitWebsiteBox">
                                    <div className="visitOurWebsite">
                                        <a className="visitOurWebsite" target="_Blank" href={this.props.data.assetWebsite}>Visit Our Website</a>
                                    </div>
                                </div>) : ('')}
                        </div>
                    </div>
                </div>
                
            </div>
            </div>

        );
    }
}

export default PreviewAsset;