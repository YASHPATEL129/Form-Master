package com.formManagement.param;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpParam {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String contact;

    private String gender;

    private String validForm;

    private String validTo;

    private String role;
}
