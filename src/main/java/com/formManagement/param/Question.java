package com.formManagement.param;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Question {

    @NotBlank
    private String questionLabel;

    @NotBlank
    private String questionName;


    private String description;

    @NotBlank
    private String answerSelect;


    @NotBlank
    private String requireAnswer;

    @NotBlank
    private Long formId;

    @NotNull
    private List<String> inputValues;

    private int validateId;
}
