package com.formManagement.response;

import com.formManagement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    String accessToken;
    String refreshToken;
    String email;
    String firstName;
    String lastName;
    String contact;
    String gender;
    String role;

}
