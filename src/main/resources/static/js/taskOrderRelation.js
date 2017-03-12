/**
 * Created by Storm on 2016/4/12.
 */
require.config({
  paths: {
    config: 'config',
    jquery: ['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min', 'jquery.min'],
    storm: 'storm-1.5',
    common: 'common',
    WdatePicker: '../My97DatePicker/WdatePicker',
    domReady: 'jquery','jquery.ztree': 'zTree/jquery.ztree-2.6.min'
  },
  shim: {
	  'jquery.ztree': ['jquery']
	  }
});
require(['config', 'jquery', 'storm', 'common', 'WdatePicker', 'md5','jquery.ztree'], function (CONFIG, $, S) {
  'use strict';

//  var $form = $('[data-form="search"]'),// 查询表单
//         $formBtn = $form.find(':submit');  //查询按钮
//  
  /**
   * 页面初始化
   */
  function init () {
  }

  // 页面JS初始化
  init();

});