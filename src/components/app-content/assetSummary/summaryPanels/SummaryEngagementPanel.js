import React from 'react';
import '../AssetSummary.scss';
import { ENGAGEMENT_SUMMARY } from "../../../../config/config";

class SummaryEngagementPanel extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        var self = this
        const engagements = () => {
            let elements = [];
            if (Object.keys(self.props.assetSummary).length === 0) {
                return;
            }
            
            if (self.props.assetSummary.engagements === null || self.props.assetSummary.engagements.count === "0") {
                let firstalertEmail = [];
                for(let i=0; i < self.props.assetSummary.firstAlert.length; i++){
                    firstalertEmail.push(self.props.assetSummary.firstAlert[i].email)
                }
                let mailTo = "mailto:" + firstalertEmail + "?subject=" + "Asset Library | Question about " + self.props.assetSummary.assetTitle;
                elements.push(<div className="noLinkedEngagements" key="no_engagemnt">Engagement data has not been linked to this asset…yet.</div>)
                elements.push(<div className="engagementsContact" key="eng_contact">
                <a className="engagementsContact" key="group_email" href={mailTo}>
                Please contact us for any questions</a></div>)
                return elements;
            }

            let count = 0;
            let show = false;
            if(self.props.assetSummary.engagements.count > 5){
                count = 5;
                show =true;
            }else{
                count = self.props.assetSummary.engagements.count;
                show = false;
            }
            console.log(count);
            console.log(show);
            elements.push(
                <div className="engagementHeader" key="recent_eng">
                    RECENT ENGAGEMENTS&nbsp;&nbsp;
                    <div className="engagementCount" key={"count_"+count}>    
                    {self.props.assetSummary.engagements.count}
                    </div>
                    
                </div>
                
            )

            
        

            for (let i = 0; i < count; i++) {
               let engagementSummary = ENGAGEMENT_SUMMARY + self.props.assetSummary.engagements.engagementDetails[i].engagementId;
                elements.push(
                    <div key={"engagement" + i} className="engagementList">
                        <div className="engagamentTitle">
                            <a target="_blank" rel="noopener noreferrer"  className="engagamentTitle"  href={engagementSummary}>
                                {self.props.assetSummary.engagements.engagementDetails[i].engagementTitle}
                            </a>
                        </div>
                        <div className="engagementDuration">
                            {self.props.assetSummary.engagements.engagementDetails[i].engagementStart} - {self.props.assetSummary.engagements.engagementDetails[i].engagementEnd}
                        </div>
                        <div className="engagementDesc">
                        {self.props.assetSummary.engagements.engagementDetails[i].industryPractice + (self.props.assetSummary.engagements.engagementDetails[i].functionalPractice? " , " + self.props.assetSummary.engagements.engagementDetails[i].functionalPractice : "")}
                        </div>
                        
                    </div>

                )
                
            }
            if(show){
                let allEng = "/ksassetfe/asset/allEngagements/"+self.props.assetSummary.departmentCode;
                elements.push(<div className="seeMore" key="see_more">
                <a target="_blank" rel="noopener noreferrer"  className="seeMore"  href={allEng}>
                See More
                </a>
                </div>)
            }
            return elements;
        }

        
        return (
            <div className="leftPanelFour">
                {engagements()}
            </div>

        );
    }
}
export default SummaryEngagementPanel;                    