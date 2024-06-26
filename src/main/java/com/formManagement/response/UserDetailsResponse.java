package com.formManagement.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserDetailsResponse {
    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String contact;

    private String gender;

    private String validForm;

    private String validTo;

    private String role;

    private int active;
}
