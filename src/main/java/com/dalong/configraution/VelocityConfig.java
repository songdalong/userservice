package com.dalong.configraution;

import org.springframework.boot.autoconfigure.velocity.VelocityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.velocity.VelocityLayoutViewResolver;
import org.springframework.web.servlet.view.velocity.VelocityViewResolver;

/**
 * 
 * @ClassName: VelocityConfig
 * @Description:提供一个velocity的配置bean
 * @author Hermit
 * @date 2016年5月9日 下午1:32:32
 * 
 */
@Configuration
public class VelocityConfig {
	
	  @Bean
	  // 现在这个class不再是layout的，所以要把对应的 ViewResolver改成对应的，由于没有
	  public VelocityLayoutViewResolver velocityViewResolver(VelocityProperties properties) {
		    //加载toolbox
		    VelocityViewResolver resolver = new VelocityViewResolver();
		    resolver.setViewClass(VelocityLayoutToolboxView.class);
		    //加载velocity配置
		    VelocityLayoutViewResolver viewResolver = new VelocityLayoutViewResolver();
//		    viewResolver.setContentType("text/html;charset=UTF-8");
//		    viewResolver.setSuffix(".html");
		    //是否使用spring对宏定义的支持
		    viewResolver.setExposeSpringMacroHelpers(true);
		    //是否开放Session属性
		    viewResolver.setExposeSessionAttributes(true);
		    //是否开放request属性
		    viewResolver.setExposeRequestAttributes(true);
		    viewResolver.setLayoutUrl("user.html");
		    properties.applyToViewResolver(viewResolver);// 设置默认属性，比如前缀和后缀
		    return viewResolver;
	  }

}