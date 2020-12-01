package com.wm.ms.model;

public class SearchCommand {
	
	String searchTerm;	
	String industryPracticeFilter;
	String functionPracticeFilter;	
	String growthPlatformPracticeFilter;
	String assetCategory;
	Integer startRow;	
	Integer endRow;
	
	public SearchCommand(String searchTerm, Integer startRow, Integer endRow) {
		super();
		this.searchTerm = searchTerm;
		this.startRow = startRow;
		this.endRow = endRow;
	}

	public SearchCommand(String searchTerm, String industryPracticeFilter, String functionPracticeFilter,
			String growthPlatformPracticeFilter ) {
		super();
		this.searchTerm = searchTerm;
		this.industryPracticeFilter = industryPracticeFilter;
		this.functionPracticeFilter = functionPracticeFilter;
		this.growthPlatformPracticeFilter = growthPlatformPracticeFilter;
	}
	
	public SearchCommand(String searchTerm, String industryPracticeFilter, String functionPracticeFilter,
			String growthPlatformPracticeFilter, String assetCategory, Integer startRow, Integer endRow) {
		super();
		this.searchTerm = searchTerm;
		this.industryPracticeFilter = industryPracticeFilter;
		this.functionPracticeFilter = functionPracticeFilter;
		this.growthPlatformPracticeFilter = growthPlatformPracticeFilter;
		this.assetCategory = assetCategory;
		this.startRow = startRow;
		this.endRow = endRow;
	}
	
	public SearchCommand(String industryPracticeFilter, String functionPracticeFilter,
			String growthPlatformPracticeFilter) {
		super();
		this.industryPracticeFilter = industryPracticeFilter;
		this.functionPracticeFilter = functionPracticeFilter;
		this.growthPlatformPracticeFilter = growthPlatformPracticeFilter;
		
	}
	
	public SearchCommand(){
		super();
	}

	public String getSearchTerm() {
		return searchTerm;
	}

	public void setSearchTerm(String searchTerm) {
		this.searchTerm = searchTerm;
	}

	public Integer getStartRow() {
		return startRow;
	}

	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}

	public Integer getEndRow() {
		return endRow;
	}

	public void setEndRow(Integer endRow) {
		this.endRow = endRow;
	}

	public String getIndustryPracticeFilter() {
		return industryPracticeFilter;
	}

	public void setIndustryPracticeFilter(String industryPracticeFilter) {
		this.industryPracticeFilter = industryPracticeFilter;
	}

	public String getFunctionPracticeFilter() {
		return functionPracticeFilter;
	}

	public void setFunctionPracticeFilter(String functionPracticeFilter) {
		this.functionPracticeFilter = functionPracticeFilter;
	}

	public String getGrowthPlatformPracticeFilter() {
		return growthPlatformPracticeFilter;
	}

	public void setGrowthPlatformPracticeFilter(String growthPlatformPracticeFilter) {
		this.growthPlatformPracticeFilter = growthPlatformPracticeFilter;
	}

	public String getAssetCategory() {
		return assetCategory;
	}

	public void setAssetCategory(String assetCategory) {
		this.assetCategory = assetCategory;
	}

}
