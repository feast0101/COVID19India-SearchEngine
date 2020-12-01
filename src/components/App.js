import React,{Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.scss';
import LibraryContainer from  './app-content/library/LibraryContainer';
import AssetSummaryContainer from  './app-content/assetSummary/AssetSummaryContainer';
import EngagementContainer from './app-content/allEngagements/EngagementContainer';
import {store} from '../store';
import AssetSubmissionPage from  './app-content/assetsubmission/AssetSubmissionPage';
import SubmitPage from './app-content/assetsubmission/submitpage/SubmitPage';
import AssetSubmission from './app-content/assetsubmission/AssetSubmission';
import CovidSearch from './app-content/covid-search/CovidSearch';
import Dashboard from './app-content/dashboard/Dashboard';
import SmallAssetSubmissionPage from './app-content/smallasset/SmallAssetSubmissionPage';

class App extends React.Component{
    render() {
        let self = this;
        const NoMatch = ({ location }) => (
            <div>
              <h3>No match for <code>{location.pathname}</code></h3>
            </div>
          )
        return (
            <Provider store={store}>
        <BrowserRouter basename={'/ksassetfe'}>
            <Fragment>
                {/* <Header/> */}
                <Switch>
                    <Route exact path='/covid-search' component={CovidSearch}/>
                    <Route exact path='/library' render={(props) => <LibraryContainer {...props}/> } />
                    <Route exact path='/assetsubmissionpage' render={(props) => <AssetSubmissionPage {...props}/> } />
                    <Route exact path='/submitsmallasset' render={(props) => <SmallAssetSubmissionPage {...props}/> } />
                    <Route exact path='/confirmation' render={(props) => <SubmitPage/> } />
                    <Route exact path='/asset/summary/:id' render={(props) => <AssetSummaryContainer {...props}/> } />
					<Route exact path='/asset/allEngagements/:departmentCode' render={(props) => <EngagementContainer {...props}/> } />
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route component={NoMatch} />
                </Switch>
                {/* <Footer/> */}
            </Fragment>

        </BrowserRouter>
    </Provider>
        );
    }
}


export default App;

