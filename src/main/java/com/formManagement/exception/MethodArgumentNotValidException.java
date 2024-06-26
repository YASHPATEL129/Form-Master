package com.formManagement.exception;


import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Data
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MethodArgumentNotValidException extends RuntimeException{

    String error;

    public MethodArgumentNotValidException(){
    }

    public MethodArgumentNotValidException(String messageKey){
        super(messageKey);
    }

    public MethodArgumentNotValidException(String message, String error){
        super(message);
        this.error = error;
    }
}
