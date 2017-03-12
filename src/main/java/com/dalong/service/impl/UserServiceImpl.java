package com.dalong.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.dalong.entity.UserInfo;
import com.dalong.filter.Filter;
import com.dalong.service.UserService;
import com.dalong.sort.IdSortStrategy;
import com.dalong.sort.LoginNameSortStrategy;
import com.dalong.sort.SortFiled;
import com.dalong.sort.SortStrategy;
import com.dalong.source.DataSource;
import com.dalong.source.impl.MapDataSouce;
import com.dalong.type.Direction;
import com.dalong.util.StringUtil;

@Service
public class UserServiceImpl implements UserService {
	private static final String ID_SIGN = "id";
	private DataSource<UserInfo> dataSource = new MapDataSouce();

	@Override
	public List<UserInfo> query(Map<String, String> filterMap, int sort, String sortFiledName) {
		if(StringUtils.isEmpty(sortFiledName)) {
			sortFiledName = ID_SIGN;
		}
		SortFiled sortFiled = buildSortFiled(getSortStrategy(sortFiledName, sort), sortFiledName);
		List<Filter> filters = buildFilters(filterMap);
		return dataSource.sort(sortFiled, getFilterSign(filters), dataSource.filter(filters));
	}
	
	private String getFilterSign(List<Filter> filters) {
		String sign = "";
		for(Filter filter : filters) {
			sign = StringUtil.append(sign, filter.getFilterFiled(), filter.getFilterValue());
		}
		return sign;
	}

	public SortFiled buildSortFiled(SortStrategy sortStrategy, String filterName) {
		
		SortFiled sortFiled = new SortFiled();
		sortFiled.setSortStrategy(sortStrategy);
		sortFiled.setDirection(sortStrategy.getDirection().getType());
		sortFiled.setSortFiled(filterName);
		return sortFiled;
	}

	private List<Filter> buildFilters(Map<String, String> filterMap) {
		List<Filter> filters = new ArrayList<>();
		for (String key : filterMap.keySet()) {
			Filter filter = new Filter(key, filterMap.get(key));
			filters.add(filter);
		}
		return filters;
	}

	private SortStrategy getSortStrategy(String filterFiled, int sort) {
		Direction direction = Direction.DESC;
		SortStrategy sortStrategy = null;
		if (Direction.ASC.getType().equals(sort)) {
			direction = Direction.ASC;
		}
		if (ID_SIGN.equals(filterFiled)) {
			sortStrategy = new IdSortStrategy().setDirection(direction);
		} else {
			sortStrategy = new LoginNameSortStrategy().setDirection(direction);
		}

		return sortStrategy;
	}

}
