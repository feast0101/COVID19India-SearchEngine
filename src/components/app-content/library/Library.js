import React from 'react';
import ListContainer from './list/ListContainer';
import HeaderContainer from './header/HeaderContainer';
import './Library.scss';

class Library extends React.Component{
    /*constructor(props) {
        super(props);
        
    }*/
    componentDidMount() {
        let applyFilter = {};
        if(Object.keys(this.props.passedFilters ).length > 0){
            applyFilter["practiceType"] = this.props.passedFilters.practiceType;
            applyFilter["owningPractice"] = this.props.passedFilters.owningPractice;
        }
        if(Object.keys(applyFilter).length > 0){
            //setTimeout(function(){this.props.fetchAssetsBasedOnFilter({id: this.props.applyFilter.practiceType + "|||" + this.props.applyFilter.owningPractice, value: this.props.applyFilter.owningPractice}, [this.props.applyFilter.owningPractice])}.bind(this), 1);
            this.props.fetchAllFilters().then(()=>{
                this.props.fetchAssetsBasedOnFilter({id: this.props.passedFilters.practiceType + "|||" + this.props.passedFilters.owningPractice, value: this.props.passedFilters.owningPractice}, [this.props.passedFilters.owningPractice]);
            })
        } else {
            this.props.fetchAllFilters();
            this.props.fetchAllAssets(); 
        }
    }
      
    render() {
        return (
            <div className="assetlist">
                {this.props.isError && <div className="error-banner"><span className="alert-icon">&#x26a0;</span>Something went wrong! Please try refreshing the page.</div>}
                <HeaderContainer/>
                <ListContainer/>
                
            </div>
        );
    }
}

export default Library;
