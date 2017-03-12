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

  var $content = $('#content'), // 表格内容
         $modalOrderDetail = $('#J_orderDetail'); // 订单详情模态框
  
  $modalOrderDetail.on('Storm.modal.confirm', function () {
	  var $this = $(this);
	  S.confirm('你确定要发货吗？', function () {
		  var $detail = $modalOrderDetail;
		  $this.postBtn(CONFIG.addr.deliverySend, {
			  orderId: S.outsert('orderId')
		  }, function () {
			  S.hint('发货成功！');
			  $detail.trigger('Storm.modal.hide');
			  $('[data-form="search"]').find(':submit').click();
		  });
	  });
  });

  /**
   * 页面初始化
   */
  function init () {
    $content.on('click', '.J_deliveryDetail', orderDetail);
  }

  function orderDetail () {
    var $this = $(this);
    $this.postBtn(CONFIG.addr.deliveryDetail, {
      orderId: $this.data('orderId')
    }, function (req) {
      $modalOrderDetail.insert(req);
      $modalOrderDetail.modal('show');
    });

  }

  // 页面JS初始化
  init();

});