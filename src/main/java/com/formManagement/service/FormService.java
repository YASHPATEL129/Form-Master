package com.formManagement.service;

import com.formManagement.param.Form;
import com.formManagement.param.PreviewAdminParam;
import com.formManagement.param.Question;
import com.formManagement.param.UpdateFormRequest;
import com.formManagement.response.CompletedFormResponse;
import com.formManagement.response.FormDetails;
import com.formManagement.response.GetFormIdResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface FormService {

    List<Object> getModule();

    List<Object> getCharacteristics(int id);

    List<Object> getSubcharacteristics(int id);

    List<Object> getRecurrance();

    List<Object> getMonths();

    List<Object> getAnswersTypes();

    GetFormIdResponse getFormId();

    void CreateForm(HttpServletRequest request,Form form, List<Question> questions);

    List<Object> getFormDetails();

    void deleteForm(Long id);

    List<Object> getNotFillForm(HttpServletRequest request);

    FormDetails getFormWithQuestionsAndAnswers(Long formId);

    void updateForm(HttpServletRequest request ,Long formId, UpdateFormRequest params);

    List<Object> getCompleteForm(HttpServletRequest request);

    CompletedFormResponse completeFormPreview(HttpServletRequest request, Long id);

    List<Object> getCompleteFormAdmin();

    CompletedFormResponse completeFormPreviewAdmin(Long formId , Long userId);

}
