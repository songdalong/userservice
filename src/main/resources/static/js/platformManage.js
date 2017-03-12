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
		$('body').on('click', '.currencyUpDownBtn', updateEnabledById);
		
		// 平台币创建
		$('body').on('click', '.createPlatformCurrencyBtn', platformCurrencyCreate);
		// 保存修改数据
		$('#platformCurrencyCreateForm').find(':submit').on('click', submitPlatformCurrencyCreateForm);
		
		// 平台币编辑
		$('body').on('click', '.platformCurrencyEditBtn', platformCurrencyEdit);
		// 保存修改数据
		$('#platformCurrencyEditForm').find(':submit').on('click', submitPlatformCurrencyEditForm);
		
		//下拉选项事件
		$('#categorySelect').on('change', categorySelect);
		
		// 进入第三方资金账户管理
		$('body').on('click', '.thirdCapitalAccountBtn', thirdCapitalAccount);
  }

	//下拉选项事件
	function categorySelect() {
		var options=$("#categorySelect option:selected"); 
		var val = options.val();
		var text = options.text();
		if((val ==401 && text =='九游')||(val ==402 && text =='360')){
			$('#tr1').show();
		}else{
			$('#tr1').hide();
		}
	}
	
	//上下架
	function updateEnabledById() {
		 var $this = $(this);
		S.post(CONFIG.addr.updateEnabledById,$this.data(), function(data) {
			 S.alert('操作成功!', function () {
				  $('[data-form="search"]').find(':submit').click();
		    });
		});
	}
	
	/**
	 * 平台币创建
	 */
	function platformCurrencyCreate() {
		var $this = $(this);
		$this.postBtn(CONFIG.addr.platformCurrencyCreate, $this.data(),function(data) {
			// 显示模态框
			modalCreateShow();
			$('#categorySelect').html(S.template(data, $('#categoryTemp').html()));
	   });
	}
	
	/**
	 * 提交创建表单
	 * 
	 * @param e
	 */
	function submitPlatformCurrencyCreateForm(e) {
		e.preventDefault();
		$('#platformCurrencyCreateForm').validate(function() {
			$('#platformCurrencyCreateForm').setForm(function() {
				  S.alert('保存成功!', function () {
					  $('[data-form="search"]').find(':submit').click();
			        });
				$('#platformCurrencyCreate').trigger('Storm.modal.hide');
			});
		});
		return false;
	}
	
	/**
	 * 平台币创建模态框显示
	 */
	function modalCreateShow() {
		$('#platformCurrencyCreate').find(':reset').trigger('click');
		$('#platformCurrencyCreate').modal('show');
	}
	
	/**
	 * 平台币编辑
	 */
	function platformCurrencyEdit() {
		var $this = $(this);
		$this.postBtn(CONFIG.addr.platformCurrencyEdit, $this.data(),function(data) {
			// 显示模态框
			modalEditShow();
			$('#platformCurrencyEditForm').insert(data);
			if((data.denominationCategoryId==401&&data.categoryName=='九游')||data.denominationCategoryId==402&&data.categoryName=='360'){
				//让充值卡类型下拉框选中值
				$("#goodsTypeId2").val(data.goodsTypeId);
				//让充值卡类别下拉框选中值
				$("#denomination2").val(data.denomination);
				$('#tr2').show();
			}else{
				$('#tr2').hide();
			}
		});
	}

	/**
	 * 模态框显示
	 */
	function modalEditShow() {
		$('#platformCurrencyEdit').find(':reset').trigger('click');
		$('#platformCurrencyEdit').modal('show');
	}
	
	/**
	 * 提交编辑表单
	 * 
	 * @param e
	 */
	function submitPlatformCurrencyEditForm(e) {
		e.preventDefault();
		$('#platformCurrencyEditForm').validate(function() {
			$('#platformCurrencyEditForm').setForm(function() {
				S.alert('修改成功!');
				$('#platformCurrencyEdit').trigger('Storm.modal.hide');
				$('[data-form="search"]').find(':submit').click();
			});
		});
		return false;
	}

    //进入第三方资金账户管理
	function thirdCapitalAccount() {
        location.href="/thirdAccount";
	}
	
  // 页面JS初始化
  init();

});