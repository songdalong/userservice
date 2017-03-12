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
         $refund_add = $('.refund_add'),//退款流水号保存
         $form = $('.form'),
         $formBtn = $form.find(':submit'),
         $exprotBtn = $('.exprotBtn'); // 导出按钮 

  /**
   * 页面初始化
   */
  function init () {
    //复制
//	$(document).on('click', $copy, copy);
	//订单详情
    $(document).on('click', '.J_orderDetailBtn', orderDetail);
    //弹出退款流水号div层
    $(document).on('click', '.refundClass', openRefund);
	//退款流水号保存
    $refund_add.click(platformRefund);
    //导出
    $exprotBtn.click(exprot);
	 //查询所有商品类别
    findPlatformCategorys();
  }
  
  /**
   * 查询所有商品类别
   */
	 function findPlatformCategorys(){
		S.post(CONFIG.addr.findPlatformCategorys, {}, function(data) {
			$('#goodsCategoryId').html(S.template(data, $('#categoryTemp').html()));
		});
	}
	 
  /**
   * 订单查询统计数据
   */
	 Storm.searchBefore = function () {
		  var data = {};
		  data[$form.data('param')] = JSON.stringify($form.formData());
		  S.post(CONFIG.addr.platformOrderSum, data , function (data) {
			  S.insert(data);
		  })
      }

  /**
   * 查看订单详情
   */
  function orderDetail () {
    var $this = $(this);
    var postData =  $this.data();
    $this.postBtn(CONFIG.addr.getPlatformOrder,postData, function (req) {
      $J_orderDetail.find('[data-insert]').html('');
      $J_orderDetail.insert(req);
      //360和九游专用
      if (req.goodsCategoryId==401||req.goodsCategoryId==402){
    	  $('.id_401_402').show();
      }else{
    	  $('.id_401_402').hide();
      }
      //百度专用
      if (req.goodsCategoryId==403){
    	  $('.id_403').show();
      }else{
    	  $('.id_403').hide();
      }
      //订单状态不是待付款就显示支付宝流水号
      if(req.orderStatus!=1&&req.choosePayWay==1){
    	  $('#id_zhifubaoFlowNo').show();
      }else{
    	  $('#id_zhifubaoFlowNo').hide();
      }
      //订单状态是退款状态6
      if(req.orderStatus==6){
    	  $('#id_refund').show();
          //退款专用,出现按钮(条件:退款状态为1)
          if (req.refundStatus==1){
        	   //退款专用,出现按钮(条件:支付方式为支付宝)
        	  if(req.choosePayWay==1){
            	  //$('.id_refund_btn').html('<button  data-order-id="'+req.orderId+'" class="btn btn-outline refundClass">'+req.refundStatusName+'</button>');
        		  $('.id_refund_btn').html('<button  class="btn btn-outline refundClass">'+req.refundStatusName+'</button>');
        	  }
          }
      }else{
    	  $('#id_refund').hide();
      }
      $J_orderDetail.modal('show');
    });
  }

  /**
   * 平台币报表导出
   */
  function exprot () {
	    S.confirm('导出会消耗服务器性能,你确定要导出吗?', function () {
	  	  var data = {};
		  data[$form.data('param')] = JSON.stringify($form.formData());
		  location.href = CONFIG.addr.platformDataReport+'?' + $.param(data);
	    });
}
 
  /**
   * 弹出退款物流号
   */
  function openRefund () {
	    // 显示模态框
	    modalOpenRefundShow();
  }
  
  /**
   * 模态框显示
   */
  function modalOpenRefundShow () {
	  $('#openRefund').find(':reset').trigger('click');
	  $('#openRefund').modal('show');
  }
  
  /**
   * 保存退款流水号
   */
  function platformRefund () {
      var $this = $(this);
	  var orderId=$('#orderId').text();
	  var refundFlowNo=$('#refundFlowNo').val();
	  var choosePayWay = $('#choosePayWay').val();
	  var postData = {
				"orderId" : orderId,
				"refundFlowNo" : refundFlowNo,
				"choosePayWay":choosePayWay
			};
     $this.postBtn(CONFIG.addr.platformRefund, postData, function (req) {
   	 S.alert('保存成功!', function () {
   		 location.reload();
//   		 $formBtn.click();
    });
    });
  }
  
  // 页面JS初始化
  init();

});