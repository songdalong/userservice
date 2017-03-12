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

  var $form = $('[data-form="search"]'),// 查询表单
         $formBtn = $form.find(':submit');  //查询按钮
  
  /**
   * 页面初始化
   */
  function init () {

    // 百度游戏删除
    $(document).on('click', '.J_deleteGameInfoBtn', deleteGameInfo);
    
    // 百度游戏导入
    $(document).on('click', '#J_importGameBtn', gameInfoImport);
  }

  /**
   * 百度游戏删除
   */
  function deleteGameInfo() {
    var $this = $(this);
    S.confirm('你确定要删除该游戏?', function () {
      $this.postBtn(CONFIG.addr.deleteGameInfo, $this.data(), function () {
        S.alert('删除成功!');
//        location.reload();
        $form.trigger('Storm.search.get');
      })
    });
  }
  
  /**
   * 百度游戏导入
   */
  function gameInfoImport() {
	  location.href="/gameInfoImport";
  }
  // 页面JS初始化
  init();

});