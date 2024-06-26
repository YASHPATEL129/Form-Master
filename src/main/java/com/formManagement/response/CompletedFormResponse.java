package com.formManagement.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompletedFormResponse {

    private String CompletedDate;
    private String title;
    private String text;
    private List<QuestionDTO> questions;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionDTO {

        private String questionLabel;
        private String questionName;
        private String requireAnswer;
        private List<String> answers;
    }
}
