import React from 'react';
import { Link } from 'react-router-dom';
import '../AssetSummary.scss';
import LeftChevron from './../../../../assets/images/Icon_ArrowRightBlue.svg';
import IconInfo from './../../../../assets/images/Icon_Info.svg';

class SummaryHeader extends React.Component {
	constructor(props) {
		super(props);
	}
    
	render() {
		const {assetSummary} = this.props;
		if(Object.keys(assetSummary).length === 0){
			return null;
		}
		var self = this

		const logo = () =>{			
            let elements = [];
           if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			if(self.props.assetSummary.assetImage != null && self.props.assetSummary.assetImage != ""){
            elements.push(<div className="logoImage" key="logo" ><img  src={self.props.assetSummary.assetImage}/></div>);
			return elements;
			}
		}
		
		const submitterEdit = () =>{
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			if(self.props.assetSummary.user.submitter === true && self.props.assetSummary.workFlowStatus ===null ) 
            {
			elements.push(<div className="editAlert" key="edit_alert">
						<div className="editPermissionsText">You have permissions to edit this asset.</div>
						<div className="editAssetRectangle"><div className="editAssetText">Edit this asset </div></div>
						<div className="manageAssetRectangle"><div className="manageAssetText">Manage my asset list </div></div>
			</div>);
			}
			return elements;
		}

		const curatorAlert = () =>{
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			if(self.props.assetSummary.user.curator === true && self.props.assetSummary.workFlowStatus === "PENDING_WITH_CURATOR" ){
				elements.push(<div className="reviewAlert">
				<div class="oval"><img alt="" src={IconInfo} /></div>
				<div className="mainMessage">Please review this asset</div>
				<div className="clickMessage">Once you click “Approve & Submit”, this asset will be sent to the EKAM team for final review.</div>					
			</div>);
			}
			if (self.props.assetSummary.user.ekam === true && self.props.assetSummary.workFlowStatus === "PENDING_WITH_EKAM"){
				elements.push(<div className="reviewAlert">
					<div class="oval"><img alt="" src={IconInfo} /></div>
					<div className="mainMessage">Please review this asset</div>
				</div>);
			}

			return elements;
		
	}
		return (
			<div>
			<div className="edit-manage-asset">	
			{submitterEdit()}
			{curatorAlert()}
			</div>
			<div className="summaryHeaderContainer">
			
				<div className="summaryHeader">
					<div className="backTo">
					<span>
					<a rel="noopener noreferrer"  href="/ks/research/home/welcome">Know Home </a><img alt="" src={LeftChevron}  /> <a rel="noopener noreferrer"  href="/ksassetfe/library">Know Asset Library</a> <img alt="" src={LeftChevron}/>
					</span>
					</div>
					{logo()}
						<div className="assetTitle">{this.props.assetSummary.assetTitle}
						<p className="owningPractice">Practice: <Link to={{pathname:'/library', search: "practiceType=" + this.props.assetSummary.practiceType+ "&owningPractice=" +encodeURIComponent(this.props.assetSummary.owningPractice)}} className="practiceText">{this.props.assetSummary.owningPractice}</Link></p>
						</div>
				</div>		
			</div>
			</div>
		);
	}
}

export default SummaryHeader;