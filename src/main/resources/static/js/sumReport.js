
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

require(['config', 'jquery', 'storm',  'WdatePicker', 'common'], function (CONFIG, $, S) {
  'use strict';
  
  var $form = $('.form'), // form 表单 
  		$exprotBtn = $('.exprotBtn'); // 导出按钮
  
  /**
   * 页面初始化
   */
  function init () {
	  $exprotBtn.click(exprot);
  }
  
  function exprot () {
	    S.confirm('导出会消耗服务器性能,你确定要导出吗?', function () {
	  	  var data = {};
		  data[$form.data('param')] = JSON.stringify($form.formData());
		  location.href = '/sumDataReport?' + $.param(data);
	    });
  }
  
  // 页面JS初始化
  init();
  
});