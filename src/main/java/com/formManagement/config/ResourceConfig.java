package com.formManagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String img = "file:" + System.getProperty("user.dir") + "/src/main/resources/static/images/";
        registry
                .addResourceHandler("/image/**")
                .addResourceLocations(img);
    }
}
