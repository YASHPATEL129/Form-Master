package com.formManagement.response;

import com.formManagement.Entity.Answers;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.objenesis.instantiator.android.AndroidSerializationInstantiator;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionResponse {

    private Long questionId;

    private String questionDescription;

    private String questionName;

    private String questionRequired;

    private String questionAnswerType;

    List<Answers> options;
}
