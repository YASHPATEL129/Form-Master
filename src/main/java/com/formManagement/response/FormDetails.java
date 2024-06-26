package com.formManagement.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormDetails {

    private Long id;
    private String formId;
    private String title;
    private String text;
    private String aliasName;
    private Integer moduleId;
    private Integer characteristicId;
    private Integer subCharacteristicId;
    private Integer recurrenceId;
    private Integer monthId;
    private Integer compliancePeriod;
    private String effectiveDate;
    private int active;
    private List<QuestionDTO> questions;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionDTO {
        private Long questionId;
        private String questionLabel;
        private String questionName;
        private String description;
        private String requireAnswer;
        private Integer answerSelect;
        private String answerTypes;
        private List<AnswerDTO> answers;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class AnswerDTO {
            private Long AnswerId;
            private String optionText;

        }
    }
}
