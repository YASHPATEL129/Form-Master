package com.formManagement.controller;

import com.formManagement.consts.Message;
import com.formManagement.param.FormSubmissionDto;
import com.formManagement.response.Success;
import com.formManagement.service.UserFormDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserFormDataController {

    @Autowired
    private UserFormDataService userFormDataService;

    @PostMapping("/saveFormData")
    public ResponseEntity<Success<?>> updateUserDetails(@RequestBody FormSubmissionDto formSubmissionDto,
                                                        HttpServletRequest request){

        userFormDataService.saveUserFormData(request,formSubmissionDto);
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setMessage(Message.USER_UPDATE_SUCCESSFUL);
        return respBuilder.body(success);
    }
}
