package com.formManagement.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

@Data
@Component
@Scope(value = "request" , proxyMode =  ScopedProxyMode.TARGET_CLASS)
public class CurrentSession {

    Long id;
    String email;
    String firstName;
    String lastName;
    String contact;
    String gender;
    String role;
}
