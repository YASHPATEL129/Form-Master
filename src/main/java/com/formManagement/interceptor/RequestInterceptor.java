package com.formManagement.interceptor;

import com.formManagement.Entity.User;
import com.formManagement.repository.UserRepository;
import com.formManagement.response.CurrentSession;
import com.formManagement.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

@Component
public class RequestInterceptor implements HandlerInterceptor {

//    static List<String> EXCLUDE_FROM_PANHANDLE = List.of( "/logIn" ,
//            "/resources/**",
//            "/WEB-INF/view/**",
//            "/assets/**/**/**",
//            "/javascript/**",
//            "/js/**",
//            "/css/**",
//            "/images/**",
//            "/image/**",
//            "/assets/js/jquery.min.js",
//            "/v1/signIn",
//            "/fillForms",
//            "/masterForm",
//            "/masterUser",
//            "/completeForms",
//            "/profile");
//
//    @Autowired
//    CurrentSession currentSession;
//
//    @Autowired
//    JwtUtil jwtUtil;
//
//    @Autowired
//    UserRepository userRepository;
//
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
//
//        if (!EXCLUDE_FROM_PANHANDLE.contains(request.getServletPath())) {
//            String accessToken = request.getHeader("Authorization");
//            String jwtToken = accessToken.substring(7);
//            String email = jwtUtil.extractUsername(jwtToken);
//            Optional<User> user = userRepository.findByEmail(email);
//            if (user.isPresent()) {
//                User existingUser = user.get();
//                m.setEmail(email);
//                currentSession.setId(existingUser.getId());
//                currentSession.setFirstName(existingUser.getFirstName());
//                currentSession.setLastName(existingUser.getLastName());
//                currentSession.setContact(existingUser.getContact());
//                currentSession.setGender(existingUser.getGender());
//                currentSession.setRole(existingUser.getRole());
//            }
//        }
//
//        return true;
//    }
//
//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
//    }
//
//    @Override
//    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
//    }
}
