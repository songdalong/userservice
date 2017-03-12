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

 var temp = $('#temp').html(), // 模板文件
	    $content = $('#content'); // 渲染元素
 
 var $form = $('.form');
 var $formBtn = $form.find(':submit'); 
 
  /**
   * 页面初始化
   */
  function init () {
	  //查询批次号
	  $formBtn.click();
	  
	 // 解析数据
	  $(document).on('click', '.analysisBtn', analysis);

  }

  // 查询批次号数据
//  function queryCardBatchNo () {
//		  S.post(CONFIG.addr.findAllBatch, {}, function (data) {
//			  $content.html(S.template(data, temp));
//		  });
//	 }
  
  // 解析详情
	window.toDetail = function() {
		  location.href="/findRecharges";
	}
  
  // 解析数据
  function analysis () {
	var $this = $(this);
    S.confirm('解析数据将耗时很长,请耐心等待...', function () { 
	  	  $('.analysisBtn').html('解析中');
		  S.alert('解析中，请稍后...');
	      $this.postBtn(CONFIG.addr.rechargeAnalysis, $this.data(), function (data) {
	    	  S.alert('充值卡解析成功');
	    	  //查询批次号
	    	  $formBtn.click();
//	    	  $('.analysisBtn').html('去查看');
	      });
    });
	  }
  
  // 页面JS初始化
  init();

});