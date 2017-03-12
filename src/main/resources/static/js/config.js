(function() {
	'use strict';

	var CONFIG = {

		// /////////
		// 是否在本地 //
		// 如果是后端开发人员, 并且域名为localhost 请修改为false
		// true: 并且域名为localhost, ajax执行get操作, ajax地址执行"前端专用"
		// flase: ajax执行post操作, ajax地址执行"后端专用"
		// /////////
		local : false,

		// ajax请求方式
		ajaxType : 'post',

		// 充值卡类型
		cardType : [ '全部', '联通', '移动', '电信' ]
	};

	// 判断是否为localhost, 并且CONFIG.local为true
	if (location.hostname === 'localhost' && CONFIG.local) { // true

		// 前端接口
		/*
		CONFIG.addr = {
			login : '/loginSubmit', // 登入
			//verifyCode : '/code?t=', // 验证码
			logout : '/logout', // 登出
			orderList : '/findOrderInfos', // 订单列表
			orderSum : '/orderSum', // 订单统计查询
			orderDetail : '/getOrderInfo', // 订单详情
			storageeCount : '/storageeCount', // 面额库存列表
			stockSum : '/stockSum', // 充值卡库存统计和金额统计
			productList : '/productList', // 商品列表
			goodsSum : '/goodsSum', // 订单统计查询
			deliveryList : '/findSendGoods', // 发货列表
			deliveryDetail : '/getSendGoods', // 发货详情
			deliverySend : '/startDelivery', // 开始发货
			exceptionList : '/abnormal', // 异常列表
			exceptionDetail : 'json/exceptionDetail.json', // 异常详情
			userList : '/findUserInfos', // 用户列表
			userCreate : '/saveUserInfo', // 用户新增用户保存
			userEdit : '/updateUser', // 用户修改保存
			userDetail : '/userInfoSet', // 用户详情
			userDelete : '/deleteUserById', // 用户删除
			productImport: '/rechargeImport', // 导入表单提交
			uploadCSV: '/uploadCSV', // 上传服务器地址
			rechargeAnalysis: '/rechargeAnalysis', // 充值卡解析
			sumDataQuery: '/sumDataQuery', // 查询报表
			roleAuthority:'/roleAuthority',//角色管理
			saveRole:'/saveRole',//新增角色
			deleteRole:'/deleteRole',//删除角色
			roleEdit:'/roleEdit',//加载需要修改的角色
			updateRole:'/updateRole',//保存修改的角色
			auth:'/auth',//加载需要修改的角色权限
			saveAuth:'/saveAuth',//保存修改的角色权限
			prentMenu:'/prentMenu',//查询所有父类菜单列表
			findAllBatch:'/findAllBatch',//查询批次号数据
			findAllBatchNo:'/findAllBatchNo',//查询所有的批次号
			rechargeAnalysis:'/rechargeAnalysis',//解析数据
			editMenu:'/editMenu',//菜单编辑
			delMenu:'/delMenu',//删除菜单
			subList:'/subList',//获取所有的子菜单
			userAuth:'/userAuth',//加载需要修改的用户权限
			saveUserAuth:'/saveUserAuth',//保存修改的用户权限
			leftRight:'/leftRight',//左边菜单查询权限
			wechatDetail:'/wechatDetail',//微信订单详情
			menuSort:'/menuSort',//菜单排序
			findPlatformCategorys:'/findPlatformCategorys',//查询所有平台币商品类别
			updateCatrgoryEnableById:'/updateCatrgoryEnableById',//平台币类别上下架操作
			editPlatformCategory:'/editPlatformCategory',//编辑平台币类别
			baiduGameInfo:'/baiduGameInfo',//进入百度游戏管理
			deleteGameInfo:'/deleteGameInfo',//百度游戏删除
			uploadGameCSV: '/uploadGameCSV', // 上传服务器地址
			findPlatformCurrencys:'/platformCurrencys',//查询平台币
			updateEnabledById:'/updatePlatformDenominationIsEnableById',//平台币上下架
			platformCurrencyCreate:'/createPlatformDenomination',//平台币创建
			platformCurrencyEdit:'/editPlatformDenomination',//平台币编辑
			findThirdAccounts:'/findThirdAccounts',//查询第三方资金账户
			remoteCapital:'/remoteCapital',//通过接口查询第三方账户远程资金
			thirdAccountFlow:'/thirdAccountFlow',//进入充值明细页面
			thirdAccountFlowSum:'/thirdAccountFlowSum'//第三方资金流水统计
		};*/

		// 本地ajax请求方式为post会报错
		// CONFIG.ajaxType = 'get';

	} else { // false

		// 后端接口
		CONFIG.addr = {
			login : '/loginSubmit', // 登入
			//verifyCode : '/code?t=', // 验证码
			logout : '/logout', // 登出
			orderList : '/findOrderInfos', // 订单列表
			orderSum : '/orderSum', // 订单统计查询
			orderDetail : '/getOrderInfo', // 订单详情
			storageeCount : '/storageeCount', // 面额库存列表
			stockSum : '/stockSum', // 充值卡库存统计和金额统计
			productList : '/productList', // 商品列表
			goodsSum : '/goodsSum', // 订单统计查询
			deliveryList : '/findSendGoods', // 发货列表
			deliveryDetail : '/getSendGoods', // 发货详情
			deliverySend : '/startDelivery', // 开始发货
			exceptionList : '/abnormal', // 异常列表
			exceptionDetail : 'json/exceptionDetail.json', // 异常详情
			userList : '/findUserInfos', // 用户列表
			userCreate : '/saveUserInfo', // 用户新增用户保存
			userEdit : '/updateUser', // 用户修改保存
			userDetail : '/userInfoSet', // 用户详情
			userDelete : '/deleteUserById', // 用户删除
			productImport: '/rechargeImport', // 导入表单提交
			uploadCSV: '/uploadCSV', // 上传服务器地址
			rechargeAnalysis: '/rechargeAnalysis', // 充值卡解析
			sumDataQuery: '/sumDataQuery', // 查询报表
			roleAuthority:'/roleAuthority',//角色管理
			saveRole:'/saveRole',//新增角色
			deleteRole:'/deleteRole',//删除角色
			roleEdit:'/roleEdit',//加载需要修改的角色
			updateRole:'/updateRole',//保存修改的角色
			auth:'/auth',//加载需要修改的角色权限
			saveAuth:'/saveAuth',//保存修改的角色权限
			prentMenu:'/prentMenu',//查询所有父类菜单列表
			findAllBatch:'/findAllBatch',//查询批次号数据
			findAllBatchNo:'/findAllBatchNo',//查询所有的批次号
			rechargeAnalysis:'/rechargeAnalysis',//解析数据
			editMenu:'/editMenu',//菜单编辑
			delMenu:'/delMenu',//删除菜单
			subList:'/subList',//获取所有的子菜单
			userAuth:'/userAuth',//加载需要修改的用户权限
			saveUserAuth:'/saveUserAuth',//保存修改的用户权限
			leftRight:'/leftRight',//左边菜单查询权限
			wechatDetail:'/wechatDetail',//微信订单详情
			androidAppDetail:'/androidAppDetail',//安卓app订单详情
			menuSort:'/menuSort',//菜单排序
			findPlatformCategorys:'/findPlatformCategorys',//查询所有平台币商品类别
			updateCatrgoryEnableById:'/updateCatrgoryEnableById',//平台币类别上下架操作
			editPlatformCategory:'/editPlatformCategory',//编辑平台币类别
			baiduGameInfo:'/baiduGameInfo',//进入百度游戏管理
			deleteGameInfo:'/deleteGameInfo',//百度游戏删除
			uploadGameCSV: '/uploadGameCSV', // 上传服务器地址
			findPlatformCurrencys:'/platformCurrencys',//查询平台币
			updateEnabledById:'/updatePlatformDenominationIsEnableById',//平台币上下架
			platformCurrencyCreate:'/createPlatformDenomination',//平台币创建
			platformCurrencyEdit:'/editPlatformDenomination',//平台币编辑
			findThirdAccounts:'/findThirdAccounts',//查询第三方资金账户
			remoteCapital:'/remoteCapital',//通过接口查询第三方账户远程资金
			thirdAccountFlow:'/thirdAccountFlow',//进入充值明细页面
			thirdAccountFlowSum:'/thirdAccountFlowSum',//第三方资金流水统计
			findPlatformOrders : '/findPlatformOrders', //平台币订单列表
			platformOrderSum : '/platformOrderSum', //平台币订单统计查询
			getPlatformOrder : '/getPlatformOrder',//平台币订单详情
			platformDataReport:'/platformDataReport',//平台币报表导出
			platformRefund:'/platformRefund',//平台币退款
			anchorDetail:'/anchorDeatail'	
		};
	}

	window.CONFIG = CONFIG;

	// 模块化写法
	if (typeof define === 'function' && define.amd) {
		define([], function() {
			return CONFIG;
		});
	}
}());