package com.formManagement.utils;


import com.formManagement.consts.Message;
import com.formManagement.response.Error;
import com.formManagement.response.ResponseData;
import com.formManagement.response.Success;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.util.Locale;
import java.util.Map;

@Component
@RestControllerAdvice
public class ResponseWrapper implements ResponseBodyAdvice<Object> {


    @Autowired
    private MessageUtil messageUtil;

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if(body instanceof Error){
            Error<?> err = (Error<?>) body;
            if (null != err.getMessageCode()){
                err.setMessage(messageUtil.getMessage(err.getMessageCode(), err.getArgs()));
            }
            return err;
        }

        if (body instanceof Success){
            Success<?> success = (Success<?>) body;
            if (success.getMessageCode() != null){
                success.setMessage(messageUtil.getMessage(success.getMessageCode()));
            }
            return success;
        }

        if (body instanceof Map){
            Map<String, Object> obj = (Map<String, Object>) body;
            if (!ObjectUtils.isEmpty(obj.get("status"))) {
                int status = Integer.parseInt(obj.get("status").toString());
                if (status < 200 || status >=300){
                    Error<?> err = new Error<>();
                    err.setMessage(messageUtil.getMessage(Message.SERVER_ERROR ));
                    return err;
                }
            }
        }
        return body;
    }
}