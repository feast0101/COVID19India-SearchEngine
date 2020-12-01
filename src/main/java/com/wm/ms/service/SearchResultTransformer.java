package com.wm.ms.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.springframework.stereotype.Service;

/**
 * Transformer Service to automatically convert Covid Search result into
 * JSON objects. 
 * 
 * @author Kallol Das
 */
@Service("searchResultTransformer")
public class SearchResultTransformer {

/**
	 * A Transformer method for covid-19 search page QueryResponse mapping
	 * It returns complete list of covid-19 india data related to a search string
	 * @param QueryResponse
	 * @return Map 
	 *
	 */ 
    public Map<Object, Object> getCovidQueryResponseMap(final QueryResponse response) {
    	
    	SolrDocument doc = null;
        Map<Object, Object> dataMap = null;
    
        final List<Object> dataList= new ArrayList<Object>();
        final Map<Object, Object> transformedMap = new HashMap<Object, Object>(); 
        final Map<Object, Object> finalTransformedMap = new HashMap<Object, Object>(); 
        
        final List<SolrDocument> docs = response.getResults();
        final Iterator<SolrDocument> it = docs.iterator();      
        
        while(it.hasNext()) {
        	doc = it.next();
			dataMap = new HashMap<Object, Object>();
        	dataMap.put("patientnumber",doc.getFieldValue("patientnumber"));
        	dataMap.put("detecteddistrict",doc.getFieldValue("detecteddistrict"));
        	dataMap.put("detectedstate",doc.getFieldValue("detectedstate"));
        	dataMap.put("numcases", doc.getFieldValue("numcases"));
        	dataMap.put("source1", doc.getFieldValue("source1"));
        	dataMap.put("statecode", doc.getFieldValue("statecode"));
        	dataMap.put("dateannounced", doc.getFieldValue("dateannounced")); 
        	dataMap.put("currentstatus",  doc.getFieldValue("currentstatus"));
			dataMap.put("notes",  doc.getFieldValue("notes"));
        	dataList.add(dataMap);
        } 
        transformedMap.put("entryNumber", response.getResults().getNumFound());
        transformedMap.put("covidDetails", dataMap);
        finalTransformedMap.put("response", transformedMap);
        return finalTransformedMap;
     }	
}
