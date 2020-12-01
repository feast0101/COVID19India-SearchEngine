import React from 'react';
import './AssetSummary.scss';
import SummaryHeader from './summaryPanels/SummaryHeader';
import SummaryDescPanel from './summaryPanels/SummaryDescPanel';
import SummaryUseCasePanel from './summaryPanels/SummaryUseCasePanel';
import SummaryContactsPanel from './summaryPanels/SummaryContactsPanel';
import SummaryEngagementPanel from './summaryPanels/SummaryEngagementPanel';
import SummaryDeploymentPanel from './summaryPanels/SummaryDeploymentPanel';
import SummaryCuratorPanel from  './summaryPanels/SummaryCuratorPanel';
import LoaderContainer from '../../common/loader/LoaderContainer';
import SummaryRightPanel from "./summaryPanels/SummaryRightPanel";


class AssetSummary extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount(){
		this.props.fetchSummary();
    }

	render() {
		const {assetSummary} = this.props;
		const isLoading = this.props.isLoading;
        if(isLoading) {
            return (<LoaderContainer/>);
        }
		return (
			<div>
				{this.props.isError && <div className="error-banner"><span className="alert-icon">&#x26a0;</span>Something went wrong! Please try refreshing the page.</div>}
				{this.props.assetSummary.responseCode===204 && <div className="error-banner"><span className="alert-icon">&#x26a0;</span>Asset summary is not found, please contact know feedback</div>}
				{this.props.assetSummary.responseCode !== 204 &&
				<SummaryHeader assetSummary={assetSummary}/>}
				{this.props.assetSummary.responseCode !== 204 &&
				<div className="summaryBody">
					<div className="leftPanel">
						 <SummaryDescPanel assetSummary={assetSummary}/>
						 <SummaryUseCasePanel assetSummary={assetSummary}/>
						 <SummaryContactsPanel assetSummary={assetSummary}/>
						 <SummaryEngagementPanel assetSummary={assetSummary}/>
						 <SummaryDeploymentPanel assetSummary={assetSummary}/>
						 
					</div>
					<SummaryRightPanel assetSummary={assetSummary}/>
									
				</div> }
				{this.props.assetSummary.responseCode !== 204 &&
				<SummaryCuratorPanel assetSummary={assetSummary}/>}	
			</div>

		);
	}
}

export default AssetSummary;
