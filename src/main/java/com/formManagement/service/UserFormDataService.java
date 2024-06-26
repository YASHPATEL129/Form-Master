package com.formManagement.service;

import com.formManagement.Entity.UserFormData;
import com.formManagement.param.FormSubmissionDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Objects;

public interface UserFormDataService {

    void saveUserFormData(HttpServletRequest request,FormSubmissionDto formSubmissionDto);


}
