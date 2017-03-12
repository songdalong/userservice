package com.dalong.vo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.StringUtils;

public class QueryVo {
	private Integer sort;
	private String sortFiled;
	private String idFilter;
	private String loginNameFilter;
	public Integer getSort() {
		if(sort == null) {
			sort = 1;
		}
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public String getSortFiled() {
		return sortFiled;
	}
	public void setSortFiled(String sortFiled) {
		this.sortFiled = sortFiled;
	}
	public String getIdFilter() {
		return idFilter;
	}
	public void setIdFilter(String idFilter) {
		this.idFilter = idFilter;
	}
	public String getLoginNameFilter() {
		return loginNameFilter;
	}
	public void setLoginNameFilter(String loginNameFilter) {
		this.loginNameFilter = loginNameFilter;
	}
	
	public Map<String, String> filterMap() {
		Map<String, String> filterMap = new HashMap<>();
		if(!StringUtils.isEmpty(idFilter)) {
			filterMap.put("id", idFilter);
		}
		if(!StringUtils.isEmpty(loginNameFilter)) {
			filterMap.put("loginname", loginNameFilter);
		}
		return filterMap;
	}
	
}
