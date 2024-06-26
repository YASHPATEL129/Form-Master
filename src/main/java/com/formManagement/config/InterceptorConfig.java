package com.formManagement.config;

import com.formManagement.interceptor.RequestInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

//    @Autowired
//    RequestInterceptor requestInterceptor;
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(requestInterceptor);
//    }
//
//
//    public void addRequestInterceptor(ResourceHandlerRegistry registry){
//        registry.addResourceHandler("/assets/**")
//                .addResourceLocations("classpath:/static/assets");
//    }
}
