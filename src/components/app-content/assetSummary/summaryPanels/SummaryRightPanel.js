import React from 'react';
import '../AssetSummary.scss';
import MailIcon from "./../../../../assets/images/Icon_Email.svg";
import { DOC_SUMMARY,KNOWNOW_SUMMARY } from "../../../../config/config";

class SummaryRightPanel extends React.Component {
    constructor(props) {
        super(props);
    }

	truncate(text){
        let ellipsis = text.length > 50 ? "..." : "";
        let maxLength = 50;
        if(text.length > maxLength){
            let truncated = text.substr(0, maxLength);
            return truncated.substr(0, Math.min(truncated.length, truncated.lastIndexOf(" "))) + ellipsis;
        }
        return text;
        
    }

    render() {
		var self = this
		const populateTags = (data,val, type) =>{
            let contacts = [];
			if(data === null){
				return;
            }
            for(let i=0; i < data.length; i++){
				let docSummary = DOC_SUMMARY+data[i].docId;
                contacts.push(
						<div className="attachmentDtls" key={type + "attach_"+i+val}>
							<a target="_blank" rel="noopener noreferrer" key={type + "attachlink_"+i+val}  className="attachmentlnk"  href={docSummary}>
								{this.truncate(data[i].docTitle)}
							</a>
						</div>)	
            }
            return contacts;
        }

		const taggedLop = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			
			if(self.props.assetSummary.smartLop != null){
				elements.push(<div className="DocumentCategory" key="lop">
							LOP Pages							
				</div>);
				elements.push(populateTags(self.props.assetSummary.smartLop, "smartlop"));
			}
			return elements;
		}

		const taggedCI = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0 ){
				return;
			}
			
			if(self.props.assetSummary.clientImpact != null){
				elements.push(<div className="DocumentCategory" key="ci">
							Client Impact Cases						
				</div>);
				elements.push(populateTags(self.props.assetSummary.clientImpact, "clientImpact"));
			}
			return elements;
		}

		const taggedOutPuts = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			
			if(self.props.assetSummary.sampleOutput != null){
				elements.push(<div className="DocumentCategory" key="sopt">
							Sample outputs					
						</div>);
				elements.push(populateTags(self.props.assetSummary.sampleOutput, "sampleOutput"));
			}
			return elements;
		}

		const taggedEM = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0 ){
				return;
			}
			if(self.props.assetSummary.emGuide != null){
				elements.push(<div className="DocumentCategory" key="emg">
							EM guide				
						</div>);
			elements.push(populateTags(self.props.assetSummary.emGuide, "emGuide"));
			}
			return elements;
		}
		
		const taggedVideo = () =>{
			let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			
			if(self.props.assetSummary.knowNowVideo != null){
				elements.push(<div className="demoVideo" key="vid">
					DEMO VIDEO
				</div>);
				for(let i=0; i< self.props.assetSummary.knowNowVideo.length; i++){
					let source =	self.props.assetSummary.knowNowVideo[i].thumbnail;
					let videoSummary = KNOWNOW_SUMMARY+self.props.assetSummary.knowNowVideo[i].docId;
					elements.push(<div className="videoContent" key="video">
				<a target="_blank" rel="noopener noreferrer" key="knownow"  className="attachmentlnk"  href={videoSummary}>
				<img src={source}/>
				</a></div>);
				
				}
				elements.push(<div className="divider"/>);
			}
			
			return elements;						
		}

		const emailTo = () =>{
			let elements = [];
			if(self.props.assetSummary.assetEmail != null && self.props.assetSummary.assetEmail.length != 0){
				
			let mailTo = "mailto:" + self.props.assetSummary.assetEmail + "?subject=" + "Asset Library | Question about " + self.props.assetSummary.assetTitle;
			elements.push(
				<div className="emailUsBox">
							<div className="emailUs">
								<a className="groupEmail" key="group_email" href={mailTo}>
								<img  alt="" src={MailIcon}/>
								<div className="emailText">Email Us</div>
								</a>
							</div>
				</div>);
			}
			return elements;
		}

		const visitWebsite = () =>{
			let elements = [];
			if(self.props.assetSummary.assetWebsite != null && self.props.assetSummary.assetWebsite.length !=0){
			elements.push(
							<a target="_blank" rel="noopener noreferrer"   className="visitWebsiteBox visitOurWebsite"  href={self.props.assetSummary.assetWebsite}>
								Visit Our Website
							</a>
						);
			}
			return elements;							
			}

		const additionalInfo = () =>{
			let elements = [];
			if((self.props.assetSummary.assetWebsite != null && self.props.assetSummary.assetWebsite.length != 0 || (self.props.assetSummary.assetEmail != null && self.props.assetSummary.assetEmail.length != 0))){
			elements.push(<div className="divider"/>);
			elements.push(<div className="additionalInfo">
							ADDITIONAL INFORMATION
						</div>);
			}
			return elements;
		}	

        return(
            <div className="rightSection">
					<div className="lastUpdated">Last updated: {this.props.assetSummary.lastUpdatedOn}</div>
					<div className="rightPanel" >
						<div className="readyToUseMateria">
							READY-TO-USE MATERIALS
							</div>
						
						{taggedLop()}
						
						
						{taggedCI()}
						
						{taggedOutPuts()}
						
						{taggedEM()}
						
						
						
						{taggedVideo()}
						
						
						
						{additionalInfo()}
						
							{emailTo()}									
						
						
							{visitWebsite()}
						
					</div>
				</div>	
        );
    }
    }
    export default SummaryRightPanel;