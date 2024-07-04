package com.formManagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.AntPathMatcher;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Configuration
public class BeanConfig {

//    @Bean("AUTH_EXCLUDED_URL_PATTERNS")
//    public static List<String> excludedPaths() {
//        return Arrays.asList(
//                "/v1/signup",
//                "/v1/signIn",
//                "/resources/**",
//                "/WEB-INF/view/**",
//                "/assets/**",
//                "/javascript/**",
//                "/image/**"
//        );
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

    @Bean("urlPathMatcher")
    public AntPathMatcher pathMatcher() {
        return new AntPathMatcher();
    }

    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        source.setBasenames("i18n/messages");
        source.setUseCodeAsDefaultMessage(true);
        source.setDefaultEncoding("UTF-8");
        source.setDefaultLocale(Locale.US);
        return source;
    }
}
