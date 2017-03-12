package com.dalong.entity;

public class UserInfo {
	private long id;
	private String loginname;
	private String password; // 加密
	private String name;
	
	public UserInfo(Builder builder) {
		id = builder.id;
		loginname = builder.loginname;
		password = builder.password;
		name = builder.name;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLoginname() {
		return loginname;
	}
	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public static class Builder{
		private long id;
		private String loginname;
		private String password; // 加密
		private String name;
		public Builder(long id) {
			this.id = id;
		}
		public Builder setLoginname(String loginname) {
			this.loginname = loginname;
			return this;
		}
		public Builder setPassword(String password) {
			this.password = password;
			return this;
		}
		public Builder setName(String name) {
			this.name = name;
			return this;
		}
		public UserInfo build() { // 构建，返回一个新对象
            return new UserInfo(this);
        }
	}

}
