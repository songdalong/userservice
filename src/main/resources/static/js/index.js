/**
 * Created by Storm on 2016/4/12.
 */
require.config({
  paths: {
    config: 'config',
    jquery: ['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min', 'jquery.min'],
    storm: 'storm-1.5',
    common: 'common'
  }
});

require(['config', 'jquery', 'storm', 'common'], function (CONFIG, $, S) {
  'use strict';
  
  /**
   * 页面初始化
   */
  function init () {

    // 查询权限
	  //leftRight();
  }

  /**
  * 查询权限
  */
//  function leftRight () {
//      var $this = $(this);
//  	  $this.postBtn(CONFIG.addr.leftRight, {}, function (data) {
//  			 $('.nav ul').html(S.template(data, $('#leftMenu').html()));
//    	});
//  }
  
  // 页面JS初始化
  init();

});