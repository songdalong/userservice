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
  },
  shim: {
	    md5: {
	      exports: 'md5'
	    }
	  }
});

require(['config', 'jquery', 'storm', 'common', 'WdatePicker', 'md5'], function (CONFIG, $, S) {
  'use strict';


  $("#exportBtn").click(function() {
	  	S.confirm('导出会消耗服务器性能,你确定要导出吗?', function () {
	  	  var data = {};
		  data['tmallInfoVo'] = JSON.stringify($("#tmallForm").formData());
		  location.href = '/tmallExport?' + $.param(data);
	    });
//		$.post("tmallExport", {'tmallInfoVo': JSON.stringify($("#tmallForm").formData())});
  });
});