import React from 'react';
import '../AssetSummary.scss';


class SummaryDeploymentPanel extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        var self = this
		const timeline = () =>{			
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			elements.push(
                <div className="timingText"  key="timing_txt" dangerouslySetInnerHTML={{__html: self.props.assetSummary.timelineDesc}}>
                </div>
               )
            return elements;				
			}
			
		const resourcing = () =>{			
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			elements.push(
                <div className="resourcingText" key="resourcing_text" dangerouslySetInnerHTML={{__html: self.props.assetSummary.resourcingDesc}}>
               </div>
            )
            return elements;				
			}

        const cost = () =>{			
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			elements.push(
                <div className="costText" key="cost_txt" dangerouslySetInnerHTML={{__html: self.props.assetSummary.costDesc}}>
               </div>
            )
            return elements;				
            }  
        
        const technology = () =>{			
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
			elements.push(
                <div className="technologyInfoText" key="tech_text" dangerouslySetInnerHTML={{__html: self.props.assetSummary.technologyDesc}}>
               </div>
            )
            return elements;				
            }              
        
            


        return(
            <div className="leftPanelFive">
            <div className="leftPanelOthers">
               <div className="deploymentModel">
                  DEPLOYMENT MODEL
               </div>
               <div className="timingHeader">
                  Timing
               </div>
               {timeline()}
               <div className="resourcingHeader">
                  Resourcing
               </div>
               {resourcing()}
               <div className="costHeader">
                  Costs
               </div>
               {cost()}
            </div>
            <div className="rightPanelOther">
               <div className="technologyInformation">
                  TECHNOLOGY INFORMATION
               </div>
               {technology()}
            </div>
         </div>

);
}
}
export default SummaryDeploymentPanel;                    