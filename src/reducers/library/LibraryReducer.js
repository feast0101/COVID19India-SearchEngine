import {SET_ALL_ASSETS, SET_FILTERS_DATA, DISABLE_FILTER} from './../../actions/library/LibraryAction';

const initialState = {
    assets: [],
    allFiltersData: [],
    filterStatus: { industry: false, function: false, growthPlatform: false},
    currentFilter: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_ASSETS:
        return Object.assign({}, state, {
            assets: action.assets
        })
    case SET_FILTERS_DATA:
        return Object.assign({}, state, {
            allFiltersData: action.allFiltersData
        })
    case DISABLE_FILTER:
        return Object.assign({}, state, {
            filterStatus: action.filterStatus
        })
    default:
        return state
    }
}