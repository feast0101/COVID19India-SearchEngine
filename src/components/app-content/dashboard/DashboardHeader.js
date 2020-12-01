import React from 'react';
import { Link } from 'react-router-dom';

import LeftChevron from './../../../assets/images/Icon_ArrowRightBlue.svg';

class DashboardHeader extends React.Component {

    render() {
        return (
                        <div className="banner">
                        <div className="breadcrumb">
                            <a className="know-home" href="/ks/research/home/welcome">
                                Know Home
                            </a>
                            <img alt="" src={LeftChevron} />
                            <a href="/ksassetfe/library" className="know-asset-library">Know Asset Library</a>
                        </div>
                        <div className="content">
                            <div className="container">
                            <p className="title">Manage My Asset List</p>
                            <div className="asset-links">
                                <div className="asset-page"><a href="#" className="asset-page"><span>Create a full asset page</span></a></div>
                                <div className="asset-add-page"><a href="#" className="asset-add-page"><span>Add an asset to my list only</span></a></div>
                            </div>
                            </div>
                            <div className="suggestion"><span className="curate">You curate assets for </span>
                            <a className="practice">Chemical & Agriculture</a>.
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <a href="mailto:Asset_Library_Support@mckinsey.com?subject=Asset Library | " className="feedback">Not right?</a>
                            </div>
                        </div>
                        </div>
        );
    }
}

export default DashboardHeader;