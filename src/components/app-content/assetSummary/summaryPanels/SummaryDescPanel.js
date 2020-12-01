import React from 'react';
import '../AssetSummary.scss';
import {EXTERNAL_ASSETS, PROFILES_LINK} from "../../../../config/config";

class SummaryDescPanel extends React.Component {
	constructor(props) {
		super(props);
	}
	
	

	render() {
		var self = this
		const firstAlert = () =>{			
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0 || self.props.assetSummary.firstAlert ===null){
				return;
			}
			for(let i=0; i < self.props.assetSummary.firstAlert.length; i++){
				let profilesLink = PROFILES_LINK + "/fmno/" + self.props.assetSummary.firstAlert[i].fmno;
				let img = EXTERNAL_ASSETS + "/person/fmno_photos/" + self.props.assetSummary.firstAlert[i].fmno  + "/thumb.jpg?dummy=allowed";	
				elements.push(<div key={"firstAlert"+i} className="firstAlertWrapper"><span>
				<a target="_blank" rel="noopener noreferrer"   className="firstAlertWrapper"  href={profilesLink}>
				<span className="circular"><img src={img} alt="" /></span>
				<div className="firstAlert">
					<span className="firstAlertName">
						{self.props.assetSummary.firstAlert[i].fullName}
					</span>
					<span className="assetLeader">Asset Leader</span>
					
				</div>
				</a>
				</span>
				</div>)				
			}
			return elements;
		}
		
		return (			
			<div className="leftPanelFirst">
						 <div className="leftPanelDesc">
							<p className="description">DESCRIPTION</p>
							
							<p className="descriptionText" dangerouslySetInnerHTML={{__html: this.props.assetSummary.assetDesc}}></p>
						</div>
						<div className="rightPanelGetHelp">
							<p className="getHelpText">GET HELP</p>
							{firstAlert()}
							
						</div>
					</div>
		);
	}
}

export default SummaryDescPanel;