import { FULL_ASSET_LIST, FILTERS_LIST } from '../../config/config';
import AjaxWrapper from '../../api/AjaxWrapper';
import { setLoader } from '../loader/LoaderAction';
import {setError} from '../error/ErrorAction';

const SET_ALL_ASSETS = 'SET_ALL_ASSETS';
const SET_FILTERS_DATA = 'SET_FILTERS_DATA';
const APPLY_FILTER = 'APPLY_FILTER';
const DISABLE_FILTER = 'DISABLE_FILTER';

const setAllAssets = (assets) => {
    return {
        type: SET_ALL_ASSETS,
        assets: assets
    };
}
const applyFilter = (assets, filter, filterStatus) => {
    return {
        type: APPLY_FILTER,
        assets: assets,
        filterStatus: filterStatus,
        allFiltersData: filter
    }
}

const disableFilter = (filterStatus) => {
    return {
        type: DISABLE_FILTER,
        filterStatus: filterStatus
    }
}

const setAllFilters = (filters) => {
    return {
        type: SET_FILTERS_DATA,
        allFiltersData: filters
    };
}

const sortByAssetTitle = (docs) => {
    return docs.sort(function (a, b) {
        a = a.assetTitle.toLowerCase();
        b = b.assetTitle.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
    });
}

const parseFilters = (filters, key) => {
    const parsedFilters = [];
    for (var i = 0; i < filters[key].length; i++) {
        let newFilter = {};
        let name = filters[key][i];
        newFilter["value"] = name;
        newFilter["id"] = key + '|||' + name;
        newFilter["label"] = name;
        newFilter["expanded"] = true;
        newFilter["checked"] = false;
        parsedFilters.push(newFilter);

    }
    return parsedFilters;
}

const updateFilterStatus = (filters, id, checked) => {
    if(filters){
        for(let i=0; i < filters.length; i++){
            let filter = filters[i];
            filter["checked"] = filter.id === id ? checked : false;
        }
    }
        
    return filters;
};

const fetchAllAssets = () => {
    return (dispatch) => {
        dispatch(setLoader(true));
        AjaxWrapper.post(FULL_ASSET_LIST, {})
            .then((response) => {
                if(response.apiError){
                    dispatch(setError(true));
                    return;
                }
                dispatch(setError(false));
                dispatch(setAllAssets(sortByAssetTitle(response.response.docs)));
                dispatch(setLoader(false));
            });
    };
};

const fetchAllFilters = () => {
    return (dispatch) => {
        return AjaxWrapper.get(FILTERS_LIST)
            .then((response) => {
                if(response.apiError){
                    dispatch(setError(true));
                    return;
                }
                dispatch(setError(false));  
                let filters = {};
                filters["industry"] = parseFilters(response, "industry");
                filters["function"] = parseFilters(response, "function");
                filters["growthPlatform"] = parseFilters(response, "growthPlatform");
                dispatch(setAllFilters(filters));
               
            });
    };
};

const createFilterPayload = (currentNode) => {
    let filterType = currentNode.id.split('|||')[0] + "PracticeFilter";
    let filterBy = {};
    filterBy[filterType] = currentNode.value;
    return filterBy;
}

const getUpdatedFilters= (filtersData, id, checked) => {
    let filters = {};
    filters["industry"] = updateFilterStatus(filtersData["industry"], id, checked);
    filters["function"] = updateFilterStatus(filtersData["function"], id, checked);
    filters["growthPlatform"] = updateFilterStatus(filtersData["growthPlatform"], id, checked);
    return filters;
}

const fetchAssetsBasedOnFilter = (currentNode, selectedNodes) => {
    return (dispatch, getState) => {
        let filterBy = {};
        let filters = null;
        let filterStatus = { industry: false, function: false, growthPlatform: false };
        if (selectedNodes.length > 0) {
            filterBy = createFilterPayload(currentNode);
            filters = getUpdatedFilters(JSON.parse(JSON.stringify(getState().library.allFiltersData)), currentNode.id, true);
            for (var key in filterStatus) {
                filterStatus[key] = key === currentNode.id.split('|||')[0] ? false : true;
            }
            dispatch(disableFilter(filterStatus));
            dispatch(setAllFilters(filters));
        } else {
            filters = getUpdatedFilters(JSON.parse(JSON.stringify(getState().library.allFiltersData)), currentNode.id, false);
            dispatch(disableFilter(filterStatus));
            dispatch(setAllFilters(filters));
        }
        dispatch(setLoader(true));
        AjaxWrapper.post(`${FULL_ASSET_LIST}`, filterBy)
            .then((response) => {
                if(response.apiError){
                    dispatch(setError(true));
                    return;
                }
                dispatch(setError(false));   
                dispatch(setLoader(false));
                
                let sortedDocs = sortByAssetTitle(response.response.docs);
                if (selectedNodes.length === 0) {
                    dispatch(setAllAssets(sortedDocs));
                    return;
                }
                
                dispatch(setAllAssets(sortedDocs));
            });
    };
};

export { fetchAllAssets, fetchAllFilters, fetchAssetsBasedOnFilter, SET_ALL_ASSETS, SET_FILTERS_DATA, DISABLE_FILTER };