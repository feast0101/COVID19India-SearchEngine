import React from 'react';
import '../AssetSummary.scss';
import { EXTERNAL_ASSETS, PROFILES_LINK } from "../../../../config/config";

class SummaryContactsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        var self = this
        
        const populateContacts = (data, role) =>{
            let contacts = [];

            for(let i=0; i < data.length; i++){
				
                let profilesLink = PROFILES_LINK + "/fmno/" +  data[i].fmno;
                let img = EXTERNAL_ASSETS + "/person/fmno_photos/" + data[i].fmno  + "/thumb.jpg?dummy=allowed";	
				contacts.push(
                    <div key={"contact_"+i+data[i].fmno} className="internalContactList">
                    <div key={"contactImg_"+i+data[i].fmno} className="intenalContactImage">
                        <span className="circular">
                            <a target="_blank" rel="noopener noreferrer"  className="circular"  href={profilesLink}>
                                <img src={img} alt="" />
                            </a>
                        </span>
                    
                    </div>
                    <div key={"contactDtls_"+i+data[i].fmno} className="internalContactDtls">
                        <div key={"contactName_"+i+data[i].fmno} className="internalContactName">
                        <a target="_blank" rel="noopener noreferrer"  className="internalContactName"  href={profilesLink}>
                            {data[i].fullName}
                        </a>
                        </div>

                        <div key={"contactRole_"+i+data[i].fmno} className="internalContactRole">{role}</div>
                    </div>
                </div>
                )				
            }
            return contacts;
        }

		const practiceManagers = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0 || self.props.assetSummary.practiceManager ===null){
				return;
            }
            elements.push(populateContacts(self.props.assetSummary.practiceManager,"Practice Manager"));
			return elements;
		}

        const serviceLineLeaders = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0 || self.props.assetSummary.serviceLineLeader ===null){
				return;
            }
            elements.push(populateContacts(self.props.assetSummary.serviceLineLeader,"Service Line Leader"));
			return elements;
        }
        
        const experts = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0 || self.props.assetSummary.expert ===null){
				return;
            }
            elements.push(populateContacts(self.props.assetSummary.expert,"Expert"));
			return elements;
        }

        const researchTeamMembers = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0 || self.props.assetSummary.researchTeamMember === null){
				return;
            }
            elements.push(populateContacts(self.props.assetSummary.researchTeamMember,"Research Team"));
			return elements;
        }

        return (
            <div className="leftPanelThird">
            <div className="internalContactWrapper">
                <div className="internalContactsText">INTERNAL CONTACTS</div>
                {practiceManagers()}
                {serviceLineLeaders()}
                {experts()}
                {researchTeamMembers()}
            </div>
        </div>
        );
    }
}
export default SummaryContactsPanel;                    

