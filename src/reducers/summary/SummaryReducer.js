import {ASSET_SUMMARY} from './../../actions/summary/SummaryAction';

const initialState = {
    assetSummary: {}
    
}

export default (state = initialState, action) => {
    switch (action.type) {
      case ASSET_SUMMARY:
        return Object.assign({}, state, {
            assetSummary: action.assetSummary
        })
    default:
        return state
    }
}