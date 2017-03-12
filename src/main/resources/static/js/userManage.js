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

  var $userCreateBtn = $('#J_userCreateBtn'), // 用户创建按钮
      $userCreateForm = $('#J_userCreateForm'), // 用户创建表单
      $userEditForm = $('#J_userEditForm'), // 用户修改表单
      $userCreateFormBtn = $userCreateForm.find(':submit'), // 用户表单创建提交按钮
      $userEditFormBtn = $userEditForm.find(':submit'), // 用户表单修改保存按钮
      $form = $('[data-form="search"]'), // 查询表单
      $userCreate = $('#J_userCreate'), // 用户创建弹出层
      $userEdit = $('#J_userEdit'); // 用户管理弹出层

  //编辑权限
  var $userRightsForm = $('#J_userRightsForm'); //权限修改表单
  var $userRightsFormBtn = $userRightsForm.find(':submit'); //权限表单修改保存按钮
  var $userRights = $('#J_userRights'); // 权限修改模态框
  
  //查询按钮
  var $formBtn = $form.find(':submit'); 
  
  var zTree;
  
  /**
   * 页面初始化
   */
  function init () {

    // 创建用户绑定事件
	$userCreateBtn.click(userCreate);

    // 用户编辑
    $(document).on('click', '.J_userEditBtn', userEdit);

    // 用户删除
    $(document).on('click', '.J_userDeleteBtn', userDelete);
    
    //保存创建数据
    $userCreateFormBtn.on('click',submitUserCreateForm);
    
    //保存修改数据
    $userEditFormBtn.on('click',submitUserEditForm);
    
    // 权限编辑
   $(document).on('click', '.J_userRightsBtn', userRights);
   
	//权限修改数据
	$userRightsFormBtn.on('click',submitUserRightsForm);
  }

  /**
   * 用户删除
   */
  function userDelete () {
    var $this = $(this);
    S.confirm('你确定要删除该用户?', function () {
      $this.postBtn(CONFIG.addr.userDelete, $this.data(), function () {
        S.alert('删除成功!');
        $form.trigger('Storm.search.get');
      })
    });
  }

  /**
   * 用户编辑
   */
  function userEdit () {
    var $this = $(this);
    $this.postBtn(CONFIG.addr.userDetail, $this.data(), function (data) {
      // 显示模态框
      modalEditShow();
      delete data.userInfo.password;
      $userEditForm.insert(data.userInfo, 'name');
      $('#userEditRoleList').html(S.template(data, $('#userEditRoleTemp').html()));
    });
  }
  
  /**
   * 用户创建
   */
  function userCreate () {
 var $this = $(this);
   $this.postBtn(CONFIG.addr.roleAuthority, {}, function (data) {
	    // 显示模态框
	    modalCreateShow();
	   $('#userCreateRoleList').html(S.template(data, $('#userCreateRoleTemp').html()));
    })
  }

  /**
   * 模态框显示
   */
  function modalCreateShow () {
    $userCreate.find(':reset').trigger('click');
    $userCreate.modal('show');
  }
  
  /**
   * 模态框显示
   */
  function modalEditShow () {
    $userEdit.find(':reset').trigger('click');
    $userEdit.modal('show');
  }

  /**
   * 提交用户创建表单
   * @param e
   */
  function submitUserCreateForm () {
    $userCreateForm.validate(function () {
      $userCreateForm.setForm(function () {
        S.alert('保存成功!', function () {
        	//location.reload();//刷新当前页面
     	     //查询
     	     $formBtn.click();
        });
        $userCreate.trigger('Storm.modal.hide');
      });
    });
    return false;
  }


  /**
   * 提交编辑表单
   * @param e
   */
  function submitUserEditForm (e) {
	  e.preventDefault();
      $userEditForm.validate(function () {
          $userEditForm.setForm(function () {
              S.alert('保存成功!');
              $userEdit.trigger('Storm.modal.hide');
  	          //查询
  	          $formBtn.click();
      });
    });
    return false;
  }

  /**
   * 权限编辑
   */
  function userRights () {
    var $this = $(this);
    
    $this.postBtn(CONFIG.addr.userAuth, $this.data(), function (data) {
    	// 显示模态框
    	modalRightsShow();
		var zn =data.zTreeNodes;
		var zTreeNodes = eval(zn);
		var setting = {
			    showLine: true,
			    checkable: true
			};
		//渲染节点菜单
		zTree = $("#tree").zTree(setting, zTreeNodes);
		//渲染userId
        $userRightsForm.insert(data, 'name');
    });
  }
  
  /**
   * 提交权限编辑表单
   * @param e
   */
  function submitUserRightsForm (e) {
	  e.preventDefault();
	  var $this = $(this);
	   var nodes = zTree.getCheckedNodes();
		var tmpNode;
		var ids = "";
		for(var i=0; i<nodes.length; i++){
			tmpNode = nodes[i];
			if(i!=nodes.length-1){
				ids += tmpNode.id+",";
			}else{
				ids += tmpNode.id;
			}
		}
		var userId = $('.userIdClass').val();
		var postData = {"userId":userId,"menuIds":ids};
		 $this.postBtn(CONFIG.addr.saveUserAuth,postData,function(data){
			 S.alert('权限编辑成功!');
			  $userRights.trigger('Storm.modal.hide');
		});
		 return false;
  
  }
  
  /**
   * 模态框显示
   */
  function modalRightsShow () {
    $userRights.find(':reset').trigger('click');
    $userRights.modal('show');
  }
  
  // 页面JS初始化
  init();

});