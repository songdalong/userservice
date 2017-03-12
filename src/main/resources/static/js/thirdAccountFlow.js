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
  }
});

require(['config', 'jquery', 'storm', 'common', 'WdatePicker'], function (CONFIG, $, S) {
  'use strict';

  var  $form = $('.form'), 
          $formBtn = $form.find(':submit'); 

  /**
   * 页面初始化
   */
  function init () {
	  //查询商品类别
	  findThirdAccounts();
		 
    //第三方账户资金流水查询统计数据
    $formBtn.click(getTotal);
  }
  
  /**
   * 查询商品类别
   */
	 function findThirdAccounts(){
		S.post(CONFIG.addr.findThirdAccounts, {}, function(data) {
			$('#categorySelect').html(S.template(data, $('#categoryTemp').html()));
		});
	}
	 
  /**
   * 第三方账户资金流水查询统计数据
   */
  function getTotal () {
	  var data = {};
	  data[$form.data('param')] = JSON.stringify($form.formData());
	  S.post(CONFIG.addr.thirdAccountFlowSum, data , function (data) {
		  S.insert(data);
	  })
  }

  // 页面JS初始化
  init();

});