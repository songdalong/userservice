package com.dalong.source.impl;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.BeanUtils;

import com.dalong.data.Data;
import com.dalong.data.impl.UserInfoData;
import com.dalong.entity.UserInfo;
import com.dalong.filter.Filter;
import com.dalong.sort.SortFiled;
import com.dalong.source.DataSource;
import com.dalong.util.StringUtil;

public class MapDataSouce extends ConcurrentHashMap<Long, UserInfo> implements DataSource<UserInfo>{

	/**
	 * Comments for <code>serialVersionUID</code>
	 * 【请在此输入描述文字】
	 */
	private static final long serialVersionUID = -6557866803993971248L;
	
	private static final MapDataSouce instance = new MapDataSouce();

	private static final Map<String, List<UserInfo>> indexMap = new HashMap<String, List<UserInfo>>();
	
	public static MapDataSouce getInstance() {
		return instance;
	}
	
	@Override
	public boolean save(UserInfo userInfo) {
		UserInfo returnInfo = put(userInfo.getId(), userInfo);
		return returnInfo != null ? true : false;
	}

	@Override
	public List<UserInfo> sort(SortFiled sortFiled) {
		return sort(sortFiled, "id1", values());
	}
	
	

	@Override
	public void init(Data<UserInfo> data) {
		for(UserInfo userInfo : data.getAll()) {
			if(userInfo != null) {
				put(userInfo.getId(), userInfo);
			}
		}
	}
	
	@Override
	public List<UserInfo> filter(List<Filter> filters) {
		List<UserInfo> filterList = new ArrayList<UserInfo>(values());
		for(Filter filter : filters) {
			filterList = filter(filter, filterList);
		}
		return filterList;
	}
	
	@Override
	public List<UserInfo> filter(Filter filter, List<UserInfo> filterList) {
		List<UserInfo> targetList = new ArrayList<UserInfo>();
		for(UserInfo userInfo : filterList) {
			PropertyDescriptor descriptor = BeanUtils.getPropertyDescriptor(UserInfo.class, filter.getFilterFiled());
			String filterValue = null;
			try {
				Object returnVal = descriptor.getReadMethod().invoke(userInfo);
				filterValue = returnVal != null ? returnVal.toString() : "";
			} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				e.printStackTrace();
			} 
			if(filterValue.toLowerCase().startsWith(filter.getFilterValue().toLowerCase())) {
				targetList.add(userInfo);
			}
		}
		return targetList;
	}
	
	public List<UserInfo> filter(List<Filter> filters, List<UserInfo> filterList) {
		for(Filter filter : filters) {
			filterList = filter(filter, filterList);
		}
		return filterList;
	}
	
	public MapDataSouce() {
		init(new UserInfoData());
	}

	@Override
	public List<UserInfo> sort(SortFiled sortFiled, String filterSign, Collection<UserInfo> sortedList) {
		List<UserInfo> userSorted = new ArrayList<>(sortedList);
		List<UserInfo> targetList = null;
		String indexKey = StringUtil.append(sortFiled.getSortFiled(), sortFiled.getDirection());
		if(indexMap.containsKey(indexKey + filterSign)) {
			targetList = indexMap.get(indexKey + filterSign);
			return targetList;
		}
		Collections.sort(userSorted, sortFiled.getSortStrategy());
		indexMap.put(indexKey + filterSign, userSorted);
		return userSorted;
	}

}
