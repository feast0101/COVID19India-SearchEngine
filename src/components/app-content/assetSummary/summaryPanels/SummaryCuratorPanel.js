import React from 'react';
import '../AssetSummary.scss';


class SummaryCuratorPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        var self = this
        const curatorApprove = () =>{
			let elements = [];
			if(Object.keys(self.props.assetSummary).length === 0){
				return;
			}
            if(self.props.assetSummary.user.curator === true && self.props.assetSummary.workFlowStatus === "PENDING_WITH_CURATOR")
            {
				elements.push(
                    <div className="curatorRectangle">
                        <div className="readyToSubmit">Are you ready to submit this asset?"</div>
                        <div className="curatorWrapper">
                        <div className="approveRectangle"><div className="approveText">Approve & Submit</div></div>
                        <div className="curatorEditRectangle"><div className="curatorEditText">Edit this asset</div></div>
                        <div className="curatorDeleteRectangle"> <div className="curatorDeleteText">Delete this asset</div></div>
                        </div>
                    </div>
                );
                return elements;
            }
            if(self.props.assetSummary.user.ekam === true && self.props.assetSummary.workFlowStatus === "PENDING_WITH_EKAM"){
                elements.push(
                    <div className="curatorRectangle">
                        <div className="readyToSubmit">Are you ready to submit this asset?"</div>
                        <div className="curatorWrapper">
                            <div className="approveRectangle"><div className="approveText">Approve & Submit</div></div>
                        </div>
                    </div>
                );
                return elements;
            }
            if(self.props.assetSummary.user.curator === true)
            {
				elements.push(
                    <div className="curatorRectangle">
                        <div className="curatorWrapper">
                        <div className="curatorEditRectangle"><div className="curatorEditText">Edit this asset</div></div>
                        <div className="curatorDeleteRectangle"> <div className="curatorDeleteText">Delete this asset</div></div>
                        </div>
                    </div>
                );
                return elements;
            }    

			return elements;
		}

        return (
            <div>
            {curatorApprove()}
            </div>
        );
    }
}
export default SummaryCuratorPanel;                    

