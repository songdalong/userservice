package com.dalong.source;

import java.util.Collection;
import java.util.List;

import com.dalong.data.Data;
import com.dalong.entity.UserInfo;
import com.dalong.filter.Filter;
import com.dalong.sort.SortFiled;

public interface DataSource<E> {
	/**
	 * 
	 * 【保存或者更新值】
	 * 
	 * @author songdl 2017年3月10日
	 * @param userInfo 
	 * @return
	 */
	boolean save(E entity);
	
	/**
	 * 
	 * 【排序方法】
	 * 
	 * @author songdl 2017年3月10日
	 * @param sortFiled
	 * @return
	 */
	List<E> sort(SortFiled sortFiled);
	/**
	 * 
	 * 【请在此输入描述文字】
	 * 
	 * @author songdl 2017年3月12日
	 * @param sortFiled
	 * @param sortedList
	 * @return
	 */
	List<E> sort(SortFiled sortFiled, String filterSign, Collection<E> sortedList);
	/**
	 * 
	 * 【data数据初始化】
	 * 
	 * @author songdl 2017年3月10日
	 * @param initUsers
	 */
	void init(Data<E> data);
	/**
	 * 
	 * 【请在此输入描述文字】
	 * 
	 * @author songdl 2017年3月12日
	 * @param filter
	 * @return
	 */
	List<UserInfo> filter(List<Filter> filters);
	/**
	 * 
	 * 【请在此输入描述文字】
	 * 
	 * @author songdl 2017年3月12日
	 * @param filter
	 * @param filterList
	 * @return
	 */
	List<UserInfo> filter(Filter filter, List<UserInfo> filterList);
}
