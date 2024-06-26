package com.formManagement.response;

import com.formManagement.Entity.Answers;
import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FormResponse {

    private Long formId;

    private String formTitle;

    private String formDescription;

    private List<QuestionResponse> questions;

}
