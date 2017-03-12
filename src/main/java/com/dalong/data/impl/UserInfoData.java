package com.dalong.data.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.dalong.data.Data;
import com.dalong.entity.UserInfo;

public class UserInfoData implements Data<UserInfo> {
	List<UserInfo> allInfo = null;

	{
		UserInfo andy = new UserInfo.Builder(1).setLoginname("andy").setName("Andy").build();
		UserInfo carl = new UserInfo.Builder(2).setLoginname("carl").setName("Carl").build();
		UserInfo bruce = new UserInfo.Builder(3).setLoginname("bruce").setName("Bruce2").build();
		UserInfo dolly = new UserInfo.Builder(4).setLoginname("dolly").setName("Dolly").build();
		allInfo = new ArrayList<UserInfo>(Arrays.asList(andy, carl, bruce, dolly));
	}

	@Override
	public List<UserInfo> getAll() {
		return allInfo;
	}

}
