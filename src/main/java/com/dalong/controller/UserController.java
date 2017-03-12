package com.dalong.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dalong.entity.UserInfo;
import com.dalong.service.UserService;
import com.dalong.vo.QueryVo;

@Controller
public class UserController {
	@Autowired
	private UserService userService;
	
	@RequestMapping("/user")
	public String User() {
		return "user";
	}	
	
	
	@RequestMapping("/query")
	@ResponseBody
	public List<UserInfo> query(QueryVo queryVo) {
		return userService.query(queryVo.filterMap(), queryVo.getSort(), queryVo.getSortFiled());
	}
}
