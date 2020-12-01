
let HEAP_DETAILS = "/heap";
let FULL_ASSET_LIST = "/ksassetbe/browse/fullList";
let FILTERS_LIST = "/ksassetbe/browse/filters";
let EXTERNAL_ASSETS = "/assetsServer";
let PROFILES_LINK = "/profilesLink";
let PRACTICE_AUTOSUGGEST = "/ksassetbe/practicesAutosuggest?practices=";
let KNOWID_AUTOSUGGEST = "/ksassetbe/knowId?params=";
let PERSON_AUTOSUGGEST = "/ksassetbe/personAutoSuggest?q=";
let VALIDATE_DEPARTMENT_CODE = "/ksassetbe/validateDepartmentID?departmentCode=";
let KNOW_NOW_VIDEO= "/ksassetbe/getKnowNowVideo?title=";
let SUBMIT_ASSET= "/ksassetbe/submitOrDraft";
let SAVE_ASSET= "/ksassetbe/submitOrDraft";
let DELETE_ASSET= "/ksassetbe/deleteAsset?";
let PERSON_PROFILE= "/personprofile";
let ASSET_SUMMARY_API = "/ksassetbe/summary/asset?id=";
//let ASSET_SUMMARY_API = "http://devhome.intranet.mckinsey.com/ksassetbe/summary/asset?id="
let ENGAGEMENT_SUMMARY = "/ks/research/summary/engagement_with_kips?id=";
let ENGAGEMENTS_API = "/ksassetbe/getEngagements?departmentCode=";
let DOC_SUMMARY = "https://home.intranet.mckinsey.com/ks/research/summary/document?id=";
let ENGAGEMENT_TOP_RESULTS = "/ksassetbe/getEngagements?departmentCode=";
let KNOWNOW_SUMMARY ="/knownow/video/";
if (process.env.NODE_ENV === 'production') {
  EXTERNAL_ASSETS = "EXTERNAL__ASSETS";
  PROFILES_LINK = "PROFILES__LINK";
}
let SEARCH_ASSET = "http://localhost:8004/search/covid-19?";
let INTEREST_GROUP = "/ks/research/assets/documents?searchType=emails&searchString=";
let EXPERTISE = "/expertise/?criteria=";
let MULTIMEDIA = "/knownow/multimedia/?criteria=";
let KNOW_DOCUMENT = "/ks/research/assets/documents?searchType=documents&searchString=";
let RESOURCES = "/ks/research/assets/documents?start=1&searchType=supersets&searchString=";
let PROFILES = "/profiles/people/fmno/";
let EDIT_SUBMISSION = "/ksassetbe/fetchAsset?assetId=";

export {
  HEAP_DETAILS, FULL_ASSET_LIST, FILTERS_LIST, EXTERNAL_ASSETS, PROFILES_LINK, PRACTICE_AUTOSUGGEST,KNOWID_AUTOSUGGEST,PERSON_AUTOSUGGEST,VALIDATE_DEPARTMENT_CODE,KNOW_NOW_VIDEO,SUBMIT_ASSET,SAVE_ASSET,DELETE_ASSET,ASSET_SUMMARY_API, ENGAGEMENT_SUMMARY,
  DOC_SUMMARY,ENGAGEMENT_TOP_RESULTS,ENGAGEMENTS_API, KNOWNOW_SUMMARY,SEARCH_ASSET,INTEREST_GROUP,EXPERTISE,MULTIMEDIA,KNOW_DOCUMENT,RESOURCES,PROFILES,EDIT_SUBMISSION
}


