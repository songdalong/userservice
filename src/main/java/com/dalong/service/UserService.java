package com.dalong.service;

import java.util.List;
import java.util.Map;

import com.dalong.entity.UserInfo;

public interface UserService {
	List<UserInfo> query(Map<String, String> filters, int sort, String sortFiled);
}
