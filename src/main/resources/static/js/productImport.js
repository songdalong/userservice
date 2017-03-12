/**
 * Created by Storm on 2016/4/12.
 */
require.config({
  paths: {
    config: 'config',
    jquery: ['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min', 'jquery.min'],
    storm: 'storm-1.5',
    common: 'common',
    webUploader: 'webuploader.min',
    WdatePicker: '../My97DatePicker/WdatePicker'
  }
});

require(['config', 'jquery', 'storm', 'webUploader', 'md5', 'common', 'WdatePicker'], function (CONFIG, $, S, webUploader) {
  'use strict';
  
  $.ajaxSetup({
	  timeout: 300000
  });

  var $J_productImport = $('#J_productImport'), // 上传表单
      $productImportBtn = $J_productImport.find(':submit'), // 上传表单按钮
      progressBar = Math.ceil(Math.random() * 25 + 70),
      $form = $('.form'), // 充值卡商品查询表单
      $formBtn = $form.find(':submit'), // 充值卡商品表单查询按钮
      $progressBar = $('.progress-bar'); // 进度条
  
  
  var  uploader = webUploader.create({
    server: CONFIG.addr.uploadCSV,
    pick: '#uploader',
    auto: false,
    multiple: false,
    duplicate: true,
    accept: {
      extensions: 'csv'
    }
  });
  uploader.on('uploadSuccess', function(file, data) {
	  document.body.onbeforeunload = null;
	  S.loading('hide');
	  $progressBar.css('width', '100%').html('100%');
	  if (data.code === '000') {
		  S.hint('上传成功!');
		  //S.alert('上传成功');
		  location.href = "/findAllBatchInfo";
	  } else {
		  S.alert(data.message, function () {
			  location.reload();
		  });
	  }
  });
  uploader.on('uploadProgress', function(file, progress) {
    $progressBar.css('width', progressBar + '%').html(progressBar + '%');
  });
  uploader.on('uploadError', function(file, reason) {
	  document.body.onbeforeunload = null;
	  S.loading('hide');
	  $productImportBtn.button('useable');
	  $progressBar.css('width', '100%').html('100%');
    S.hint('上传失败 原因' + reason);
  });
  uploader.on('error', function (type) {
	  if (type === 'Q_TYPE_DENIED') {
	    S.hint('请选择CSV文件!');
	  } else if (type === 'F_DUPLICATE') {
		  S.hint('请不要选择重复文件！');
	  } else {
		  S.hint('上传错误！');
	  }
	  });
	uploader.on('beforeFileQueued', function (file) {
		if (file.ext === 'csv' || file.ext === 'CSV') {
			$productImportBtn.button('useable');
		} else {
			$productImportBtn.button('disable');
		}
	    $('.webuploader-pick').html(file.name);
	  });
	uploader.on('startUpload', function () {
		$productImportBtn.button('disable');
	});

  /**
   * 页面Javascript初始化
   */
  function init () {
	 //查询所有的批次号
	  findAllBatchNo() ;
	 //充值卡导入
    $productImportBtn.click(productImport);
    // 充值卡商品库存查询
    $formBtn.click(getTotal);
  }

  //查询所有的批次号
  function findAllBatchNo(){
		  S.post(CONFIG.addr.findAllBatchNo, {}, function (data) {
			  $('#cardBatchNoSelect').html(S.template(data, $('#cardBatchNoTemp').html()));
		  });
  }
		  
  // 充值卡商品库存查询
  function getTotal () {
	  var data = {};
	  data[$form.data('param')] = JSON.stringify($form.formData());
	  S.post(CONFIG.addr.goodsSum, data , function (data) {
		  S.insert(data);
	  })
  }
 
  //商品导入
  function productImport (e) {
    if (!$('[name="cardType"]').val()) {
    	S.hint('请选择充值卡类型！');
    	return false;
    }
    uploader.options.formData = {cardType: $('[name="cardType"]').val()};
    document.body.onbeforeunload = function (e) {
    	e = e || window.event;
    	e.returnValue = '数据正在处理中， 请勿离开！';
    }
    S.loading('show');
    uploader.upload();
  }

  // 页面JS初始化
  init();

});