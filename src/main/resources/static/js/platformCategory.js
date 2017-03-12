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
	
  /**
   * 页面初始化
   */
  function init () {
		// 上下架
		$('body').on('click', '.J_categoryUpDownBtn', updateCatrgoryEnableById);
		// 进入百度游戏列表
		$('body').on('click', '.J_gameInfoBtn', baiduGameInfo);
		// 类别编辑
		$('body').on('click', '.J_platformCategoryEditBtn', platFormEdit);
		// 保存修改数据
		$('#J_platformCategoryEditForm').find(':submit').on('click', submitPlatformEditForm);
  }

    //进入百度游戏列表
	function baiduGameInfo() {
        location.href="/baiduGameInfo";
	}
	
	//上下架
	function updateCatrgoryEnableById() {
		 var $this = $(this);
		S.post(CONFIG.addr.updateCatrgoryEnableById,$this.data(), function(data) {
			 S.alert('操作成功!', function () {
				 $('[data-form="search"]').find(':submit').click();
		    });
		});
	}
	
	/**
	 * 平台币类别编辑
	 */
	function platFormEdit() {
		var $this = $(this);
		$this.postBtn(CONFIG.addr.editPlatformCategory, $this.data(),function(data) {
			// 显示模态框
			modalEditShow();
			//给类别赋值
			$('#J_platformCategoryEditForm').insert(data, 'name');
		});
	}

	/**
	 * 模态框显示
	 */
	function modalEditShow() {
		$('#J_platformCategoryEdit').find(':reset').trigger('click');
		$('#J_platformCategoryEdit').modal('show');
	}
	
	/**
	 * 提交编辑表单
	 * 
	 * @param e
	 */
	function submitPlatformEditForm(e) {
		e.preventDefault();
		$('#J_platformCategoryEditForm').validate(function() {
			$('#J_platformCategoryEditForm').setForm(function() {
				 S.alert('修改成功!', function () {
					 $('[data-form="search"]').find(':submit').click();
			    });
				 $('#J_platformCategoryEdit').trigger('Storm.modal.hide');
			});
		});
		return false;
	}

  // 页面JS初始化
  init();

});