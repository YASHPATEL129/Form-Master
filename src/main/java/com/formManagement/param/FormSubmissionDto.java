package com.formManagement.param;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormSubmissionDto {

    private Long formId;
    private List<AnswerDto> answers;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AnswerDto {
        private Long questionId;
        private Long answerId;
        private String value;
    }
}
