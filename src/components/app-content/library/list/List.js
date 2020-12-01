import React from 'react';
import Assets from './assets/Assets'
import './List.scss';
import LoaderContainer from '../../../common/loader/LoaderContainer';

class List extends React.Component{
    /*constructor(props) {
        super(props);
    }*/

    render() {
        const isLoading = this.props.isLoading;
        if(isLoading) {
            return (<LoaderContainer/>);
        } else {
            return ( 
            <div className="libraryList">
                <p className="assetCount">{this.props.assets.length} Assets</p>
                {/* <a mailto="" className="want-to-be-first-alert">Want to be a First Alert?</a> */}
                <Assets config={{rows: this.props.assets, filterByOwned: this.props.fetchAssetsBasedOnFilter}}/>
            </div>)
        }
    }
}

export default List;