/**
 * Created by Storm on 2016/4/12.
 */
require.config({
  paths: {
    config: 'config',
    jquery: ['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min', 'jquery.min'],
    storm: 'storm-1.5',
    common: 'common',
    WdatePicker: '../My97DatePicker/WdatePicker'
  },
  shim: {
	  'jquery.ztree': ['jquery']
	  }
});
require(['config', 'jquery', 'storm', 'common', 'WdatePicker', 'md5'], function (CONFIG, $, S) {
  'use strict';

  var $form = $('[data-form="submit"]'),// 查询表单
         $formBtn = $form.find(':submit');//查询按钮
  
  /**
   * 页面初始化
   */
  function init () {
	  // 增加资金
	  $formBtn.on('click', addThirdAccountCapital);
	  //通过接口查询第三方账户远程资金
	  $('body').on('click', '.remoteCapitalBtn', remoteCapital);
	  //充值流水明细
	  $('.thirdAccountFlow').on('click', thirdAccountFlow);
	  //查询第三方账户列表
	  queryThirdAccount();
  }

  /**
   * 查询第三方账户
   */
	 function queryThirdAccount(){
		S.post(CONFIG.addr.findThirdAccounts, {}, function(data) {
			$('#content').html(S.template(data, $('#temp').html()));
			$('#categorySelect').html(S.template(data, $('#categoryTemp').html()));
		});
	}
 
	  /**
	   * 通过接口查询第三方账户远程资金
	   */
		 function remoteCapital(){
			 var $this = $(this);
			 $this.postBtn(CONFIG.addr.remoteCapital, $this.data(),function(data) {
				 $this.button().html(data);
			});
		}
		 
		  /**
		   * 充值流水明细
		   */
			 function thirdAccountFlow(){
					location.href=CONFIG.addr.thirdAccountFlow;
			}
			 
	/**
	 * 增加资金
	 * 
	 */
	  function addThirdAccountCapital() {
		  $form.validate(function () {
			  $form.setForm(function (data) {
		        S.alert(data.msg, function () {
		        	queryThirdAccount();
		        });
		      });
		    });
		return false;
	  }
	
  // 页面JS初始化
  init();

});