/**
 * Created by Storm on 2016/4/12.
 */
require.config({
  paths: {
    config: 'config',
    jquery: ['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min', 'jquery.min'],
    storm: 'storm-1.5',
    common: 'common'
  },
  shim: {
    md5: {
      exports: 'md5'
    }
  }
});

require(['config', 'jquery', 'storm', 'md5', 'common'], function (CONFIG, $, S) {
  'use strict';

  var $login = $('#J_loginForm'), // 登录表单
      $loginBtn = $login.find(':submit');// 登录表单提交按钮
      //$code = $('#J_code'); // 验证码

  /**
   * 页面Javascript初始化
   */
  function init () {

    // 登录表单按钮事件
    $loginBtn.click(login);
    
    // 更换验证码
    // $code.click(codeChange);

    // codeChange();
  }

  /**
   * 登录
   * @param e
   * @returns {boolean}
   */
  function login (e) {
    e.stopPropagation();
    $login.validate(function () {
	      $login.setForm(function () {
	        location.href = "/index";
	      });
    });
    return false;
  }

  // 更换验证码
  /*function codeChange () {
    $code.attr('src', CONFIG.addr.verifyCode + $.now());
  }*/

  // 页面JS初始化
  init();

});