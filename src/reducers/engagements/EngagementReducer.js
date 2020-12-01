import {ASSET_ENGAGEMENTS} from './../../actions/engagements/EngagementAction';

const initialState = {
    allEngagements: {}
    
}

export default (state = initialState, action) => {
    switch (action.type) {
      case ASSET_ENGAGEMENTS:
        return Object.assign({}, state, {
            allEngagements: action.allEngagements
        })
    default:
        return state
    }
}