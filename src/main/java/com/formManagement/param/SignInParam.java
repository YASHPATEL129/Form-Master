package com.formManagement.param;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInParam {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
