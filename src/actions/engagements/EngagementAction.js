import AjaxWrapper from '../../api/AjaxWrapper';
import { setLoader } from '../loader/LoaderAction';
import {setError} from '../error/ErrorAction';
import { ENGAGEMENTS_API} from '../../config/config';

const ASSET_ENGAGEMENTS = 'ASSET_ENGAGEMENTS';


const setEngagements = (allEngagements) => {
    return {
        type: ASSET_ENGAGEMENTS,
        allEngagements: allEngagements
    };
}


const fetchEngagements = (departmentCode) => {
    console.log("in fetch");
    return (dispatch) => {
        dispatch(setLoader(true));
            AjaxWrapper.get(ENGAGEMENTS_API+departmentCode+"&allEngagements=true")
           //AjaxWrapper.get(ASSET_SUMMARY_API)
            .then((response) => {
                if(response.apiError){
                    dispatch(setError(true));
                    return;
                }
                
                dispatch(setError(false)); 
                dispatch(setEngagements(response));
                dispatch(setLoader(false));
            });
    };
};

export  {fetchEngagements, ASSET_ENGAGEMENTS };