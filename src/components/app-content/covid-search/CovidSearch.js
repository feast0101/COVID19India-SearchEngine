import React, {Component, Fragment} from 'react';

import './CovidSearch.scss';

import AjaxWrapper from '../../../api/AjaxWrapper';
import ReactPagination from '../../common/react-pagination/ReactPagination';
import {encodeQueryParams, getQueryParams, scrollToTop} from '../../../utils/helper';
import SearchIcon from './../../../assets/images/Icon_Search.svg';
import ArrowDownIcon from './../../../assets/images/Icon_ArrowDown.svg';
import ArrowUpIcon from './../../../assets/images/Icon_ArrowUp.svg';
import {SEARCH_ASSET} from '../../../config/config';
import axios from 'axios';

class CovidSearch extends Component {
  constructor(props) {
    super(props);
    const queryParams = getQueryParams();
    this.state = {
      searchTerm: queryParams.searchTerm ? queryParams.searchTerm : '',
      assetViewState: {},
      searchResults: [],
      searchCount: 0,
      appliedFilter: {},
      paginator: {
        limit: 20,
        page: 1,
        displayRange: 10
      },
      assetsSearchInitiator: null
    };
    this.searchAssets = this.searchAssets.bind(this);
    this.toggleAssetViewState = this.toggleAssetViewState.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.assetsSearchInitiatorCallback = this.assetsSearchInitiatorCallback.bind(this);
  }

  componentDidMount() {
    if (!this.state.searchTerm.length) return;
    this.getAssets(this.state.searchTerm, this.state.paginator.page, this.state.appliedFilter);
  }
  componentWillMount() {
    this.getAssets(this.state.searchTerm,this.state.paginator.page,this.state.appliedFilter);
    }
  getAssets(searchTerm, page, filter) {
    let startRow = 0;
    let endRow = 20;
    if (page > 1) {
      startRow = ((page - 1) * 20) + 1;
    }
    const queryParams = {
      searchString: searchTerm,
      startRow, endRow
    };

    if (filter.type) {
      queryParams[filter.type] = filter.value === '*' ? '*' : `"${filter.value}"`;
    }

    const queryString = encodeQueryParams(queryParams).replace(')', '%29').replace('(', '%28');

    AjaxWrapper.get(SEARCH_ASSET+`${queryString}`).then((response) => {
      if (!response.apiError) {
        const searchResults = response.response.covidDetails;
        const searchCount = response.response.entryNumber;
        const assetViewState = {};
        searchResults.forEach(asset => {
          assetViewState[asset.entryid] = {
            expand: false,
            loadingEngagements: false
          };
        });
        this.setState({searchResults, searchCount, assetViewState});
      } else {
        this.setState({
          searchResults: [],
          searchCount: 0,
          assetViewState: {}
        });
      }
    });
  }

  assetsSearchInitiatorCallback() {
    this.getAssets(this.state.searchTerm, this.state.paginator.page, this.state.appliedFilter);
    this.props.history.push(`/covid-search?searchTerm=${this.state.searchTerm}`);

  }

  searchAssets(event) {
    const searchTerm = event.target.value;
    this.setState((prevState) => {
      if (prevState.assetsSearchInitiator) clearTimeout(prevState.assetsSearchInitiator);
      return {
        searchTerm,
        paginator: {...prevState.paginator, page: 1},
        appliedFilter: {},
        assetsSearchInitiator: setTimeout(this.assetsSearchInitiatorCallback, 500)
      };
    });
  }

  toggleAssetViewState(asset) {
    this.setState((prevState) => {
      const assetViewState = prevState.assetViewState;
      assetViewState[asset.entryid].expand = !assetViewState[asset.entryid].expand;
      return {assetViewState};
    }, () => {
    });
  }

  onPageChange(page) {
    this.setState((prevState) => {
      return {paginator: {...prevState.paginator, page}}
    }, () => {
      this.getAssets(this.state.searchTerm, this.state.paginator.page, this.state.appliedFilter);
      scrollToTop();
    });
  }

  showMoreIndustry = (filterType) => {
     this.setState({ industryFilterIndex: this.state.filters.industry.length })
     this.state.moreIndustry = false;
  }

  showMoreFunction = (filterType) => {
    this.setState({ functionFilterIndex: this.state.filters.function.length })
    this.state.moreFunction = false;
 }

 showMoreGrowth = (filterType) => {
  this.setState({ growthFilterIndex: this.state.filters.growth.length })
  this.state.moreGrowth = false;
}

  render() {
    var self = this

    return (
      <div className="assets-container">
        <div className="assets-search">
            <div className="headerContainer">
            <div className="header">
              <div className="search-bar">
              <div className="">
              <div className="search-icon"><img alt="" src={SearchIcon}/></div>
              <div className="search-input"><input type="text" value={this.state.searchTerm} onChange={this.searchAssets} placeholder="search covid-19 india cases by keyword"/></div>
              </div>
              </div>
            </div>
            </div>
            <div className="search-results-container">
    
              <div className="results-container">
                <div className="results">
                  <p className="count">{`${this.state.searchCount} results found`}</p>
                  <div className="covid-list">
                    {
                      this.state.searchResults.map((asset, index) => {
                        return <div className="covid-case" key={`case-id-${index}`}>
                          <p className="title">Patient No. : {asset.patientnumber}</p>
                          
                          <p className="description" dangerouslySetInnerHTML={{__html: asset.notes}}></p>
                          {
                            this.state.assetViewState[asset.entryid].expand && <div className="people-container">
                              <p className="title">Case Details</p>
                              <p className="title">Number of cases :  {asset.numcases}</p>
                              <p className="title">Date Announced : {asset.dateannounced}</p>
                              <p className="title">Current Status : {asset.currentstatus}</p>  
                              <p className="title">Detected District : {asset.detecteddistrict}</p>
                              <p className="title">Detected state : {asset.detectedstate}</p>
                            </div>
                          }
                          <div className="meta">
                            {
                              <p className="covid-toggle" onClick={this.toggleAssetViewState.bind(this, asset)}>
                                {this.state.assetViewState[asset.entryid].expand ? <strong>less</strong> :<strong>more</strong> }
                                {this.state.assetViewState[asset.entryid].expand ? <img alt="" src={ArrowUpIcon}/> :
                                  <img alt="" src={ArrowDownIcon}/>}
                              </p>
                            }
                            <p className="owner">{`details`}</p>
                            {asset.dateannounced && <p className="date">{`Updated ${asset.dateannounced}`}</p>}
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
                {
                    this.state.searchCount > 20 && <ReactPagination
                    activePage={this.state.paginator.page}
                    itemsCountPerPage={this.state.paginator.limit}
                    pageRangeDisplayed={this.state.paginator.displayRange}
                    totalItemsCount={this.state.searchCount}
                    onChange={this.onPageChange}
                  />
                }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default CovidSearch;
