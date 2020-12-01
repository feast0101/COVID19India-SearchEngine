import React from 'react';
import './Engagement.scss';
import { ENGAGEMENT_SUMMARY } from "../../../config/config";

class AllEngagements extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchEngagements(this.props.departmentCode);
    }
    render() {
        var self = this;
        if(self.props.allEngagements.response == undefined){
            return null;
        }
        const engagements = () => {
            let elements = [];
            
            if (self.props.allEngagements.response.count === 0) {
                elements.push(<div className="noLinkedallEngagements" key="no_engagemnt">Engagment data has not been linked to this asset…yet.</div>)
                elements.push(<div className="allEngagementsContact" key="eng_contact">Please contact us for any questions</div>)
                return elements;
            }

            
            elements.push(
                <div className="allEngagementHeader" key="recent_eng">
                    RECENT ENGAGEMENTS&nbsp;&nbsp;
                    <div className="allEngagementCount" key={"count_"}>    
                      {self.props.allEngagements.response.count}
                    </div>
              
                </div>
                
            )

            
        

            for (let i = 0; i < self.props.allEngagements.response.count; i++) {
                if(self.props.allEngagements.response.engagementDetails[i] == undefined){
                    continue;
                }
               let engagementSummary = ENGAGEMENT_SUMMARY + self.props.allEngagements.response.engagementDetails[i].engagementId;
                elements.push(
                    <div key={"engagement" + i} className="allEngagementList">
                        <div className="allEngagementTitle">
                            <a target="_blank" rel="noopener noreferrer"  className="allEngTitleTxt"  href={engagementSummary}>
                                {self.props.allEngagements.response.engagementDetails[i].engagementTitle}
                            </a>
                        </div>
                        <div className="allEngagementDuration">
                            {self.props.allEngagements.response.engagementDetails[i].engagementStart} - {self.props.allEngagements.response.engagementDetails[i].engagementEnd}
                        </div>
                        <div className="allEngagementDesc">
                        {self.props.allEngagements.response.engagementDetails[i].industryPractice + (self.props.allEngagements.response.engagementDetails[i].functionalPractice? " , " + self.props.allEngagements.response.engagementDetails[i].functionalPractice : "")}
                        </div>
                        
                    </div>

                )
                
            }
           
            return elements;
        }
        
    return (
        <div className="allEngagements">
            {engagements()}
        </div>

    );
}
     
}
export default AllEngagements;  