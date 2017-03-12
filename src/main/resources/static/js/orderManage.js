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

  var $J_orderDetail = $('#J_orderDetail'),// 订单详情
         $form = $('.form'),
         $formBtn = $form.find(':submit'); 

  /**
   * 页面初始化
   */
  function init () {
    $(document).on('click', '.J_orderDetailBtn', orderDetail);
    
 // 订单查询统计数据
//    $formBtn.click(getTotal);
  }
  
  // 订单查询统计数据
//  function getTotal () {
//	  var data = {};
//	  data[$form.data('param')] = JSON.stringify($form.formData());
//	  S.post(CONFIG.addr.orderSum, data , function (data) {
//		  S.insert(data);
//	  })
//  }

  /**
   * 订单查询统计数据
   */
	 Storm.searchBefore = function () {
		  var data = {};
		  data[$form.data('param')] = JSON.stringify($form.formData());
		  S.post(CONFIG.addr.orderSum, data , function (data) {
			  S.insert(data);
		  })
      }
	 
  /**
   * 查看订单详情
   */
  function orderDetail () {
    var $this = $(this);
    $this.postBtn(CONFIG.addr.orderDetail, $this.data(), function (req) {
      $J_orderDetail.find('[data-insert]').html('');
      $J_orderDetail.insert(req);
      $J_orderDetail.modal('show');
    });
  }

  // 页面JS初始化
  init();

});