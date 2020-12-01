import AjaxWrapper from '../../api/AjaxWrapper';
import { setLoader } from '../loader/LoaderAction';
import {setError} from '../error/ErrorAction';
import { ASSET_SUMMARY_API} from '../../config/config';

const ASSET_SUMMARY = 'ASSET_SUMMARY';


const setSummary = (assetSummary) => {
    return {
        type: ASSET_SUMMARY,
        assetSummary: assetSummary
    };
}


const fetchSummary = (asset) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        let assetId = asset.match.params.id;
       console.log(assetId);
            AjaxWrapper.get(ASSET_SUMMARY_API+assetId)
           //AjaxWrapper.get(ASSET_SUMMARY_API)
            .then((response) => {
                if(response.apiError){
                    dispatch(setError(true));
                    return;
                }
                
                dispatch(setError(false)); 
                dispatch(setSummary(response));
                dispatch(setLoader(false));
            });
    };
};

export  {fetchSummary, ASSET_SUMMARY };