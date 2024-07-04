package com.formManagement.service;

import com.formManagement.Entity.User;
import com.formManagement.param.SignInParam;
import com.formManagement.response.AuthResponse;
import com.formManagement.response.UserDetailsResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AccountService {

    void signUp(String param, MultipartFile image , HttpServletRequest request , HttpServletResponse response) throws IOException;

    AuthResponse signIn(SignInParam signInParam, HttpServletRequest request , HttpServletResponse response);

    List<Object> getAllUsers();

    void deleteUser(Long id);

    UserDetailsResponse getUserDetailsById(Long id);

    void updateUser(HttpServletRequest request,Long id ,String param, MultipartFile image ) throws IOException;

    List<Object> getAllUsersBySearch(String role, String searchValue);

    void createUserByCSV(HttpServletRequest request, MultipartFile file) throws IOException;
}