package com.formManagement.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetModulesResponse {

    private int moduleId;

    private String moduleName;
}
