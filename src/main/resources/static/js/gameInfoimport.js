/**
 * Created by Storm on 2016/4/12.
 */
require.config({
  paths: {
    config: 'config',
    jquery: ['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min', 'jquery.min'],
    storm: 'storm-1.5',
    common: 'common',
    webUploader: 'webuploader.min'
  }
});

require(['config', 'jquery', 'storm', 'webUploader', 'md5', 'common'], function (CONFIG, $, S, webUploader) {
  'use strict';
  
  $.ajaxSetup({
	  timeout: 300000
  });

  var $J_gameInfoImport = $('#J_gameInfoImport'), // 上传表单
      $gameInfoImportBtn = $J_gameInfoImport.find(':submit'), // 上传表单按钮
      progressBar = Math.ceil(Math.random() * 25 + 70),
      $form = $('.form'), // 百度游戏导入表单
      $formBtn = $form.find(':submit'), // 百度游戏导入按钮
      $progressBar = $('.progress-bar'); // 进度条
  
  
  var  uploader = webUploader.create({
    server: CONFIG.addr.uploadGameCSV,
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
//		  S.hint('上传成功!');
		  S.alert('上传成功!', function () {
			  location.href = "/baiduGameInfo";
	        });
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
	  $gameInfoImportBtn.button('useable');
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
			$gameInfoImportBtn.button('useable');
		} else {
			$gameInfoImportBtn.button('disable');
		}
	    $('.webuploader-pick').html(file.name);
	  });
	uploader.on('startUpload', function () {
		$gameInfoImportBtn.button('disable');
	});

  /**
   * 页面Javascript初始化
   */
  function init () {
	 //百度游戏导入
    $gameInfoImportBtn.click(gameInfoImport);
  }

  //百度游戏导入
  function gameInfoImport (e) {
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