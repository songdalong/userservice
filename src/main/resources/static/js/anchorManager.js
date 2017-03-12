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

  var $wechatEditForm = $('#J_wechatEditForm'), // 用户创建表单
  	  $wechartEditFormBtn = $wechatEditForm.find(':submit'),
      $wechatEdit = $('#J_wechatEdit'); // 用户管理模态框

  /**
   * 页面初始化
   */
  function init () {
    $(document).on('click', '.J_wechatEditBtn', wechatEdit);
    $wechartEditFormBtn.click(submitWechatEditForm);
  }

  /**
   * 用户编辑
   */
  function wechatEdit() {
    var $this = $(this);
    $this.postBtn(CONFIG.addr.anchorDetail, $this.data(), function (data) {
        // 显示模态框
        modalEditShow();
    	$wechatEditForm.insert(data, 'name');
    });
  }

  
  /**
   * 模态框显示
   */
  function modalEditShow () {
	$wechatEdit.find(':reset').trigger('click');
	$wechatEdit.modal('show');
  }

  /**
   * 提交编辑表单
   * @param e
   */
  function submitWechatEditForm (e) {
	  e.preventDefault();
	  var remark = S.trim($('#remark').val()); // 备注
	  if (remark.length < 4) {
		  S.hint('请输入4个以上备注');
		  return false;
	  }
	  if (/[\s]{5,}/.test(remark)) {
		  S.hint('请不要输入五个连续空格！');
		  return false;
	  }
	  $wechatEditForm.validate(function () {
	      $wechatEditForm.setForm(function (data) {
	    	  console.log(e);
	    	  if("success" === data) {
	    		  S.alert('补发成功！', function () {
	  	  	        window.location.reload();//刷新当前页面
	  	    	  });
	    	  } else {
	    		  S.alert('补发失败！', function () {
		  	  	      window.location.reload();//刷新当前页面
		  	      });
	    	  }
	      });
	  });
    return false;
  }

  // 页面JS初始化
  init();
  
});