import React from 'react';
import '../AssetSummary.scss';


class SummaryUseCasePanel extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        var self = this
		const useCases = () =>{			
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0 || self.props.assetSummary.useCases ===null){
				return;
			}
			for(let i=0; i < self.props.assetSummary.useCases.length; i++){
				
				elements.push(
                <div key={"useCase"+i} className="useCaseList">
                    <div key={"useCaseTitle"+i}  className="useCaseTitle" dangerouslySetInnerHTML={{__html: self.props.assetSummary.useCases[i].useCaseTitle}}></div>
                    <div key={"useCaseDesc"+i} className="useCaseDesc">
                       <p dangerouslySetInnerHTML={{__html: self.props.assetSummary.useCases[i].useCaseDesc}}></p>
                      </div>
                  </div>   
                )				
			}
			return elements;
		}


        return (
            <div className="leftPanelSecond">
                <div className="leftPanelUseCases">
                    <div className="commonUseCases">COMMON USE CASES</div>
                    {useCases()}
                </div>    
            </div>
        );
    }
}
export default SummaryUseCasePanel;                    