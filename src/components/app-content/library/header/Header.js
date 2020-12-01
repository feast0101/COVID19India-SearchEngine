import React from 'react';
import Filter from './filter/Filter'
import './Header.scss';
import LeftChevron from './../../../../assets/images/Icon_ArrowRightBlue.svg';

class Header extends React.Component{
    /*constructor(props) {
        super(props);
    }*/

    render() {
        const industryFilterConfig = {
            placeholder: 'Industry',
            className: 'industry',
            options: this.props.filters.industry,
            onChange: this.props.fetchAssetsBasedOnFilter,
            disabledFilter: this.props.filterStatus.industry
        };
        const functionFilterConfig = {
            placeholder: 'Function',
            options: this.props.filters.function,
            className: 'function',
            onChange: this.props.fetchAssetsBasedOnFilter,
            disabledFilter: this.props.filterStatus.function
        };
        const growthFilterConfig = {
            placeholder: 'Growth Platforms & Other Entities',
            options: this.props.filters.growthPlatform,
            className: 'growthPlatform',
            onChange: this.props.fetchAssetsBasedOnFilter,
            disabledFilter: this.props.filterStatus.growthPlatform
        };
        return (
            <div className="libraryHeaderContainer">
            <div className="libraryHeader">
               <div className="leftSection">
                <a rel="noopener noreferrer" className="back-to-know-home" href="/ks/research/home/welcome"><img alt="" src={LeftChevron} />Back to Know Home</a>
                <p className="knowAssetLibrary">Know Asset Library</p>
                <p className="welcomeToKnow">Welcome to the Know Asset Library! Select a cell to find a full list of useful tech assets - including applications, tools, workspaces, platforms, algorithms and more.<span className="searchOnKnow"><a target="_blank" rel="noopener noreferrer" className="searchOnKnow" href="/ksassetfe/assets-search?searchTerm=*"> Click here to search all assets on Know.</a></span></p>
				<p className="welcomeToKnowFeedback">For any questions/feedback, please reach out to <a className="knowFeedback" href="mailto:Asset_Library_Support@mckinsey.com">Asset_Library_Support@mckinsey.com</a></p>
                <div className="filters">
                        <p>Select a cell:</p>
                        <Filter config={industryFilterConfig}/>
                        <Filter config={functionFilterConfig}/>
                        <Filter config={growthFilterConfig}/>
                </div>
                </div>
                <div className="rightSection">
                    <div className="want-to-contribute-block">
                        <span className="want-to-contribute">Want to contribute?</span>
                        <a target="_blank" rel="noopener noreferrer" href="/ksassetfe/assetsubmissionpage" className="create-full-asset"><span>Create a full asset page</span></a>
                       {/*  <a className="manage-my-asset-list"><span>Manage my asset list</span></a> */}
                    </div>
                </div>
               </div>
               </div>
        );
    }
}

export default Header;