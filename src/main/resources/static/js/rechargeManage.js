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

 var   $form = $('.form'), // 充值卡总库存和总金额统计报表表单
  $formBtn = $form.find(':submit');// 充值卡总库存和总金额统计报表表单查询按钮

  /**
   * 页面初始化
   */
  function init () {
	    // 充值卡总库存和总金额统计报表
	    $formBtn.click(getTotal);
  }

  // 充值卡总库存和总金额统计报表
  function getTotal () {
	  var data = {};
	  data[$form.data('param')] = JSON.stringify($form.formData());
	  S.post(CONFIG.addr.stockSum, data , function (data) {
		  S.insert(data);
	  })
  }
 
  // 页面JS初始化
  init();

});