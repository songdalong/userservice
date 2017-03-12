/**
 * Created by Storm on 2016/4/12.
 */

define(['config', 'jquery', 'storm'], function (CONFIG, $, S) {
  'use strict';

  var $logoutBtn = $('.logoutBtn'); // 退出登录按钮
  
  /**
   * 页面初始化
   */
  function init () {

    // 获取默认参数
    $('[data-form="search"]').search();

    // 充值卡类型
    $('[data-select="cardType"]').each(cardType);
    
    // 默认时间
    $('.defaultDay').each(defaultDay);
    
    // 默认当前时间往前一天
    $('.prevDay').each(prevDay);
   
    // 查询权限
	  leftRight();
	  
	// 绑定退出登录事件
	$logoutBtn.click(exitLogin);
		    
  }
  
  function nav () {
	  $('.nav').on('click', '.nav-slider > li > a', function () {
		  $(this).parent().addClass('active').siblings().removeClass('active');
	  });
	  $('.nav .active').parents('li').addClass('active');
  }
   
  /**
   * 查询权限
   */
   function leftRight () {
	   if ($('.nav ul').length  <= 0) {
		   return false;
	   }
   	  S.post(CONFIG.addr.leftRight, {}, function (data) {
   			 $('.nav ul').html(S.template(data, $('#leftMenu').html()));
   			nav();
     	});
   }
   
   /**
    * 登出方法
    */
   function exitLogin () {
     $logoutBtn.postBtn(CONFIG.addr.logout, {}, function () {
       S.alert('你已退出登录!', function () {
         location.href = '/login';
       });
     });
   }
   
  function prevDay () {
	  $(this).val(S.dateFormat(new Date(new Date().getTime() - 86400000)))
  }
  
  /**
   * 默认当天时间
   */
  function defaultDay () {
	  $(this).val(S.dateFormat('YYYY-MM-DD'));
  }

  /**
   * 充值卡类型
   */
  function cardType () {
    var $this = $(this), html = '<option selected disabled>充值卡类别</option>';
    $.each(CONFIG.cardType, function (index, value) {
      html += '<option value="' + index + '">' + value + '</option>';
    });
    $this.html(html);
  }

  /**
   * 表单提交方法
   * @param callback
   * @returns {*}
   */
  $.fn.setForm = function (callback, before) {
    return this.each(function () {
      var $this = $(this),
          options = $.extend({}, $this.data(), options),
          $submitBtn = $this.find(':submit');

      var set = function () {
        var param = $this.formData(), data = {};
        if (param.password) {
        	param.password = hex_md5(param.password);
        }
        before && before(param);
        param = $.extend({}, param, S.splitHref());
        if (options.param) {
        	data[options.param] = JSON.stringify(param);
        } else {
        	data = param;
        }
        $submitBtn.postBtn((CONFIG.addr[options.action] || options.action), data, function (req) {
          callback && callback(req);
        });
      };
      set();
      return false;
    });
  };

  /**
   * 数据查询, 展示, 分页;
   * @param options
   * @returns {*}
   */
  $.fn.search = function (options) {
    var defaults = {
      page: 'pageNo'
    };
    return this.each(function () {
      var $this = $(this);
      options = $.extend({}, defaults, $this.data(),  options);
      var $content = $(options.content),
          template = $(options.template).html(),
          $pagination = $(options.pagination),
          $submitBtn = $this.find(':submit');

      var get = function (currentPage) {
    	  $this.validate(function () {
    		  var param = $this.formData(), data = {};
    	        if (options.param) {
    	        	data[options.param] = JSON.stringify(param);
    	        } else {
    	        	data = param;
    	        }
    	        data[options.page] = currentPage || 1;
    	        data.pageSize = 10;
    	        $submitBtn.postBtn((CONFIG.addr[options.action] || options.action), data, function (req) {
    	        	
    	        	try {
    	    			  Storm.searchBefore && Storm.searchBefore();
    	    		  }catch(e) {console.log(e)}
    	        	
    	        	// 统计数据插入
    	        	if(Storm.ajaxData.extraData) {
    	        		Storm.insert(Storm.ajaxData.extraData);
    	        	}
    	        	
    	        	// 如果有content
    	        	if (req.content) {
    	        		$content.html(S.template(req.content, template));
  	    	          if (req.totalPages === 0) {
  	    	        	$pagination.html('');
  	    	        	  return false;
  	    	          }
  	    	          $pagination.pagination(req.number + 1, req.totalPages, function (page) {
  	    	            get(page);
  	    	          });
    	        	} else {
    	        		$content.html(S.template(req, template));
    	        	}
    	        });
            });
      };

      $submitBtn.click(function (e) {
        e.stopPropagation();
        get();
        return false;
      });

      $this.on('Storm.search.get', function () {
        get();
      });

      // get();
    });
  };

  // 页面JS初始化
  init();

});