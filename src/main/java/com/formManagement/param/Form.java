package com.formManagement.param;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Form {

    @NotBlank
    private String titleText;

    @NotBlank
    private String aliasName;

    @NotBlank
    private String moduleId;

    @NotBlank
    private String characteristicsId;

    @NotBlank
    private String subCharacteristicsId;

    @NotBlank
    private String recurrenceId;

    @NotBlank
    private String monthId;

    @NotBlank
    private String compliancePeriod;

    @NotBlank
    private String dateFrom;

    @NotBlank
    private String textEnglish;

    @NotBlank
    private String formId;

    private int active;
}
