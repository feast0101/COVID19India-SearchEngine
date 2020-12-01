import FullList from './fullList';
import Filters from './filtersList';
import {HEAP_DETAILS, FULL_ASSET_LIST, FILTERS_LIST,ASSET_SUMMARY_API,PRACTICE_AUTOSUGGEST,VALIDATE_DEPARTMENT_CODE,KNOWID_AUTOSUGGEST,PERSON_AUTOSUGGEST,SUBMIT_ASSET,SAVE_ASSET,ENGAGEMENT_TOP_RESULTS,ENGAGEMENTS_API,EDIT_SUBMISSION} from './../config/config';
import AssetSummary from './assetSummary';
import PersonAutosuggest from './personAutosuggest';
import KnowIdAutosuggest from './knowIdAutosuggest';
import engagementTopResults from './engagementTopResults';
import AllEngagements from './allEngagements';
import searchResults from './searchResults.js';
import editsubmission from './editsubmission.js';

const urlDataMapping = {};
urlDataMapping[ASSET_SUMMARY_API] = AssetSummary;
urlDataMapping["http://localhost:8004/search/covid-19?"] = searchResults;
urlDataMapping[HEAP_DETAILS] = {"heapKey": "0", "fmno": "0", "email": "test@external.mckinsey.com", "name": "Test"};
urlDataMapping[FULL_ASSET_LIST] = FullList;
urlDataMapping[FILTERS_LIST] = Filters;
urlDataMapping[PRACTICE_AUTOSUGGEST] = {"response":{"owningPractice":["Pharmaceuticals & Medical Products"]}};
urlDataMapping[SUBMIT_ASSET] = {"nodeRef":"workspace://SpacesStore/5c342a3c-a72a-42a3-9deb-1d9ebb5e0354","Doc ID":"10140","message":"Asset Successfully created"};
urlDataMapping[SAVE_ASSET] = {"nodeRef":"workspace://SpacesStore/5c342a3c-a72a-42a3-9deb-1d9ebb5e0354","Doc ID":"10140","message":"Asset Successfully created"};
urlDataMapping[VALIDATE_DEPARTMENT_CODE] = { "response": { "description": [ { "id": "4829", "title": "Wave" } ] } };
urlDataMapping[ENGAGEMENT_TOP_RESULTS] = engagementTopResults;
urlDataMapping[EDIT_SUBMISSION] = editsubmission;

urlDataMapping[KNOWID_AUTOSUGGEST] = KnowIdAutosuggest;
urlDataMapping[PERSON_AUTOSUGGEST] = PersonAutosuggest;
urlDataMapping[ENGAGEMENTS_API] = AllEngagements;
window.fetch = function(url, payload) {
  if(url.indexOf(ENGAGEMENTS_API) !== -1){
    console.log(ENGAGEMENTS_API);
    url = ENGAGEMENTS_API;
  }
  if(url.indexOf(ASSET_SUMMARY_API) !== -1){
    url = ASSET_SUMMARY_API;
  }
  if(url.indexOf("http://localhost:8004/search/covid-19?") !== -1){
    url = "http://localhost:8004/search/covid-19?";
  }

  if(url.indexOf(PRACTICE_AUTOSUGGEST) !== -1){
  //console.log(url)
    url = PRACTICE_AUTOSUGGEST;
  }
  if(url.indexOf(VALIDATE_DEPARTMENT_CODE) !== -1){
  //console.log(url)
    url = VALIDATE_DEPARTMENT_CODE;
  }if(url.indexOf(KNOWID_AUTOSUGGEST) !== -1){
  //console.log(url)
    url = KNOWID_AUTOSUGGEST;
  }if(url.indexOf(PERSON_AUTOSUGGEST) !== -1){
  //console.log(url)
    url = PERSON_AUTOSUGGEST;
  }if(url.indexOf(SAVE_ASSET) !== -1){
  //console.log(url)
    url = SAVE_ASSET;
  }if(url.indexOf(SUBMIT_ASSET) !== -1){
  //console.log(url)
    url = SUBMIT_ASSET;
  }if(url.indexOf(ENGAGEMENT_TOP_RESULTS) !== -1){
  //console.log(url)
    url = ENGAGEMENT_TOP_RESULTS;
  }if(url.indexOf(EDIT_SUBMISSION) !== -1){
  //console.log(url)
    url = EDIT_SUBMISSION;
  }
  if(url === FULL_ASSET_LIST){
    let docs = FullList.response.docs;
    let filteredDocs = [];
    let filterBy = JSON.parse(payload.body);
    if(Object.keys(filterBy).length > 0){
      for(var i=0; i< docs.length; i++){
        let doc = docs[i]["owningPractice"] ? docs[i]["owningPractice"][0] : docs[i]["owningPractice"];
        if(filterBy["industryPracticeFilter"]){
          if(doc === filterBy["industryPracticeFilter"]){
            filteredDocs.push(docs[i]);
          }
        }
        if(filterBy["functionPracticeFilter"]){
          if(doc === filterBy["functionPracticeFilter"]){
            filteredDocs.push(docs[i]);
          }
        }
        if(filterBy["growthPlatformPracticeFilter"]){
          if(doc === filterBy["growthPlatformPracticeFilter"]){
            filteredDocs.push(docs[i]);
          }
        }
      }
      urlDataMapping[url] = {response: {docs:filteredDocs}};
    } else {
      urlDataMapping[url] = FullList;
    }
  }
   return Promise.resolve({
      status: 200,
      json: () => {
        return urlDataMapping[url];
      }
  })
}