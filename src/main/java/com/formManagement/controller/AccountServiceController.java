package com.formManagement.controller;

import com.formManagement.consts.Message;
import com.formManagement.param.SignInParam;
import com.formManagement.response.Success;
import com.formManagement.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/v1")
public class AccountServiceController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/signup")
    public ResponseEntity<Success<?>> signUp(@RequestParam("Image") MultipartFile image,
                                             @RequestParam("data") @NotBlank @Validated String param ,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws IOException {

        accountService.signUp(param, image, request, response);
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setMessage(Message.CREATE_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @PostMapping("/signIn")
    public ResponseEntity<Success<?>> signIn(@RequestBody @Validated SignInParam signInParam,
                                             HttpServletRequest request,
                                             HttpServletResponse response) {
        Object data = accountService.signIn(signInParam, request, response);
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setMessageCode(Message.LOGIN_SUCCESSFUL);
        success.setData(data);
        return respBuilder.body(success);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<Success<?>> getAllUsers(){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData(accountService.getAllUsers());
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Success<?>> deleteUser(@PathVariable Long id){
        accountService.deleteUser(id);
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setMessage(Message.USER_DELETE_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getUserDetails/{id}")
    public ResponseEntity<Success<?>> getUserDetailsById(@PathVariable Long id){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        success.setData( accountService.getUserDetailsById(id));
        return respBuilder.body(success);
    }

    @PostMapping("/updateUserDetails/{id}")
    public ResponseEntity<Success<?>> updateUserDetails(@PathVariable Long id,
                                                        @RequestParam(value = "Image",required = false)  MultipartFile image,
                                                        HttpServletRequest request,
                                             @RequestParam("data") @NotBlank @Validated String param) throws IOException {

        accountService.updateUser(request ,id, param, image);
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setMessage(Message.USER_UPDATE_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getAllUserBySearch")
    public ResponseEntity<Success<?>> getAllUserBySearch(@RequestParam(required = false) String role,
                                                         @RequestParam(required = false) String searchValue){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData(accountService.getAllUsersBySearch(role,searchValue));
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }
}
