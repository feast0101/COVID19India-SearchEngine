import React, {Component} from 'react';

import './Dashboard.scss';



import DashboardHeader from './DashboardHeader.js'
import AssetsInProgress from './AssetsInProgress.js'
import PublishedAssets from './PublishedAssets.js'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div className="dashboardLayout">
      <div className="dashboardHeader">
          <DashboardHeader/>
      </div>    
        <div className="content">
          <div className="assets">
            <AssetsInProgress/>
            <PublishedAssets/>
            
          </div>
        </div>
      
      </div>
    );
  }
}

export default Dashboard;