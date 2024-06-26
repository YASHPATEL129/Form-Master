package com.formManagement.param;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateFormRequest {


    private FormDetails formDetails;


    private List<QuestionRequest> questions;

    // Getters and setters
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FormDetails {

        private String titleText;

        private String aliasName;

        private Integer moduleId;

        private Integer characteristicsId;

        private Integer subCharacteristicsId;

        private Integer recurrenceId;

        private Integer monthId;

        private Integer compliancePeriod;

        private String dateFrom;

        private String textEnglish;

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionRequest {

        private Long questionId;

        private String questionLabel;

        private String questionName;

        private String description;

        private String requireAnswer;

        private Integer answerSelect;

        private List<AnswerRequest> answers;


        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class AnswerRequest {

            private Long answerId;
            private String optionText;

        }
    }
}
