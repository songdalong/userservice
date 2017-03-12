package com.dalong.filter;

public class Filter {
	private String filterFiled;
	private String filterValue;
	public String getFilterFiled() {
		return filterFiled;
	}
	public void setFilterFiled(String filterFiled) {
		this.filterFiled = filterFiled;
	}
	public String getFilterValue() {
		return filterValue;
	}
	public void setFilterValue(String filterValue) {
		this.filterValue = filterValue;
	}
	
	public Filter(String filterFiled, String filterValue) {
		this.filterFiled = filterFiled;
		this.filterValue = filterValue;
	}
}
