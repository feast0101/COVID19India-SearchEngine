package com.wm.ms.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wm.ms.model.SearchCommand;
import com.wm.ms.service.SearchService;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
public class SearchController {
		
	@Autowired
	SearchService searchService;
	
  
	 /**
	 * Covid-19 India search controller
     * @param request
     * @param response
     * @param searchString
     * @param startRow
     * @param endRow
     * @param model
     * @throws Exception
     */
	@RequestMapping(value = "/covid-19", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public JSONObject searchCovidCases(
			final HttpServletRequest request,
			final HttpServletResponse response,
			@RequestParam(name="searchString", required=true, defaultValue="*") final String searchString,
			@RequestParam(name="startRow", required=false, defaultValue="0") final Integer startRow,
			@RequestParam(name="endRow", required=false, defaultValue="20") final Integer endRow,
			final ModelMap model) throws Exception{
		//response.setHeader("Access-Control-Allow-Origin", "*");
		//response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		SearchCommand searchCommand = new SearchCommand(searchString, startRow, endRow);
	  return new JSONObject(searchService.searchCovidCases(searchCommand, model));
	}
}
