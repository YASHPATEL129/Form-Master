package com.formManagement.service.impl;

import com.formManagement.Entity.*;
import com.formManagement.consts.ErrorKeys;
import com.formManagement.consts.Message;
import com.formManagement.exception.NotFoundException;
import com.formManagement.param.Form;
import com.formManagement.param.Question;
import com.formManagement.param.UpdateFormRequest;
import com.formManagement.response.CompletedFormResponse;
import com.formManagement.response.CurrentSession;
import com.formManagement.response.FormDetails;
import com.formManagement.response.GetFormIdResponse;
import com.formManagement.service.FormService;
import com.formManagement.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class FormServiceImpl extends BaseService implements FormService  {

    @Autowired
    CurrentSession currentSession;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public List<Object> getModule() {
        return mstFormRepository.getModule();
    }

    @Override
    public List<Object> getCharacteristics(int id) {
        return mstFormRepository.getCharacteristics(id);
    }

    @Override
    public List<Object> getSubcharacteristics(int id) {
        return mstFormRepository.getSubCharacteristics(id);
    }

    @Override
    public List<Object> getRecurrance() {
        return mstFormRepository.getRecurrence();
    }

    @Override
    public List<Object> getMonths() {
        return mstFormRepository.getMonths();
    }

    @Override
    public List<Object> getAnswersTypes() {
        return mstFormRepository.getAnswerTypes();
    }

    @Override
    public GetFormIdResponse getFormId() {
        Optional<MstForm> lastForm = mstFormRepository.findTopByOrderByIdDesc();
        GetFormIdResponse getFormIdResponse = new GetFormIdResponse();

        if (lastForm.isPresent()) {
            String lastFormId = lastForm.get().getFormId();
            int lastIdNumber = Integer.parseInt(lastFormId.split("-")[1]);
            String formId = String.format("F0RM-%02d", lastIdNumber + 1);
            getFormIdResponse.setFormId(formId);
        } else {
            getFormIdResponse.setFormId("F0RM-01");
        }
        return getFormIdResponse;
    }

    @Override
    public void CreateForm(HttpServletRequest request, Form form, List<Question> questions) {
        String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7);
        getLoginUser(jwtToken);
        // save form
        MstForm savedForm = new MstForm()
                .setFormId(form.getFormId())
                .setTitle(form.getTitleText())
                .setAliasName(form.getAliasName())
                .setModuleId(Integer.valueOf(form.getModuleId()))
                .setCharacteristicId(Integer.valueOf(form.getCharacteristicsId()))
                .setSubCharacteristicId(Integer.valueOf(form.getSubCharacteristicsId()))
                .setRecurrenceId(Integer.valueOf(form.getRecurrenceId()))
                .setMonthId(Integer.valueOf(form.getMonthId()))
                .setCompliancePeriod(Integer.valueOf(form.getCompliancePeriod()))
                .setEffectiveDate(form.getDateFrom())
                .setText(form.getTextEnglish())
                .setCreateBy(currentSession.getId());
        mstFormRepository.save(savedForm);


        for (Question question : questions) {
            MstFormQuestion mstFormQuestion = new MstFormQuestion()
                    .setQuestionLabel(question.getQuestionLabel())
                    .setQuestionName(question.getQuestionName())
                    .setDescription(question.getDescription())
                    .setAnswerSelect(Integer.parseInt(question.getAnswerSelect()))
                    .setRequireAnswer(question.getRequireAnswer().equals("Yes") ? 1 : 0)
                    .setForm(savedForm);

            mstFormQuestionRepository.save(mstFormQuestion);

            // Save answer options
            List<String> inputValues = question.getInputValues();
            if (inputValues != null) {
                for (String option : inputValues) {
                    Answers answerOption = new Answers()
                            .setQuestion(mstFormQuestion)
                            .setFormId(savedForm.getId())
                            .setOptionText(option);
                    answersRepository.save(answerOption);
                }
            }
        }
    }

    @Override
    public List<Object> getFormDetails() {
        return mstFormRepository.getFormDetails();
    }

    @Override
    public void deleteForm(Long id) {
        Optional<MstForm> form = mstFormRepository.findById(id);
        if (form.isPresent()) {
            MstForm existingForm = form.get();
            existingForm.setActive(9);
            mstFormRepository.save(existingForm);
        } else {
            throw new NotFoundException(Message.FORM_NOT_FOUND, ErrorKeys.FORM_NOT_FOUND);
        }
    }

    @Override
    public List<Object> getNotFillForm(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
            String jwtToken = accessToken.substring(7);
            String email = jwtUtil.extractUsername(jwtToken);
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                User existingUser = user.get();
                currentSession.setId(existingUser.getId());
            }
        return mstFormRepository.findFormsNotFilledByUser(currentSession.getId());
    }


    @Override
    public FormDetails getFormWithQuestionsAndAnswers(Long formId) {
        MstForm form = mstFormRepository.findFormWithQuestions(formId);
        if (form == null) {
            return null;
        }

        FormDetails formDTO = new FormDetails();
        formDTO.setId(form.getId());
        formDTO.setFormId(form.getFormId());
        formDTO.setTitle(form.getTitle());
        formDTO.setText(form.getText());
        formDTO.setActive(form.getActive());
        formDTO.setAliasName(form.getAliasName());
        formDTO.setCharacteristicId(form.getCharacteristicId());
        formDTO.setSubCharacteristicId(form.getSubCharacteristicId());
        formDTO.setEffectiveDate(form.getEffectiveDate());
        formDTO.setModuleId(form.getModuleId());
        formDTO.setMonthId(form.getMonthId());
        formDTO.setRecurrenceId(form.getRecurrenceId());
        formDTO.setCompliancePeriod(form.getCompliancePeriod());
        List<Long> questionIds = form.getQuestions().stream().map(MstFormQuestion::getId).collect(Collectors.toList());
        List<Answers> answers = mstFormRepository.findAnswersByQuestionIds(questionIds);

        List<FormDetails.QuestionDTO> questionDTOs = form.getQuestions().stream().map(question -> {
            FormDetails.QuestionDTO questionDTO = new FormDetails.QuestionDTO();
            questionDTO.setQuestionId(question.getId());
            questionDTO.setQuestionLabel(question.getQuestionLabel());
            questionDTO.setQuestionName(question.getQuestionName());
            questionDTO.setDescription(question.getDescription());
            questionDTO.setRequireAnswer(question.getRequireAnswer().equals(1) ? "Yes" : "No");
            questionDTO.setAnswerSelect(question.getAnswerSelect());
            String answerType = answersRepository.getAnswerTypes(Long.valueOf(question.getAnswerSelect()));
            questionDTO.setAnswerTypes(answerType);
            List<FormDetails.QuestionDTO.AnswerDTO> answerDTOs = answers.stream()
                    .filter(answer -> answer.getQuestion().getId().equals(question.getId()))
                    .map(answer -> {
                        FormDetails.QuestionDTO.AnswerDTO answerDTO = new FormDetails.QuestionDTO.AnswerDTO();
                        answerDTO.setAnswerId(answer.getId());
                        answerDTO.setOptionText(answer.getOptionText());
                        return answerDTO;
                    }).collect(Collectors.toList());

            questionDTO.setAnswers(answerDTOs);
            return questionDTO;
        }).collect(Collectors.toList());

        formDTO.setQuestions(questionDTOs);
        return formDTO;
    }

    @Override
    public void updateForm(HttpServletRequest request, Long formId, UpdateFormRequest params) {
        String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7);
        getLoginUser(jwtToken);

        Optional<MstForm> optionalForm = mstFormRepository.findById(formId);
        if (optionalForm.isPresent()) {
            MstForm existingForm = optionalForm.get();
            // Soft delete existing questions and answers
                try {
                    for (MstFormQuestion existingQuestion : existingForm.getQuestions()) {
                        existingQuestion.setIsDeleted(true);
                        if (existingQuestion.getAnswers() != null) {
                            for (Answers existingAnswer : existingQuestion.getAnswers()) {
                                existingAnswer.setIsDeleted(true);
                            }
                        }
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Error while soft deleting existing questions and answers", e);
                }

            // Update form details
                try {
                    existingForm.setTitle(params.getFormDetails().getTitleText());
                    existingForm.setAliasName(params.getFormDetails().getAliasName());
                    existingForm.setModuleId(params.getFormDetails().getModuleId());
                    existingForm.setCharacteristicId(params.getFormDetails().getCharacteristicsId());
                    existingForm.setSubCharacteristicId(params.getFormDetails().getSubCharacteristicsId());
                    existingForm.setRecurrenceId(params.getFormDetails().getRecurrenceId());
                    existingForm.setMonthId(params.getFormDetails().getMonthId());
                    existingForm.setCompliancePeriod(params.getFormDetails().getCompliancePeriod());
                    existingForm.setEffectiveDate(params.getFormDetails().getDateFrom());
                    existingForm.setText(params.getFormDetails().getTextEnglish());
                    existingForm.setModifyBy(currentSession.getId());
                } catch (Exception e) {
                    throw new RuntimeException("Error while updating form details", e);
                }


            for (UpdateFormRequest.QuestionRequest questionRequest : params.getQuestions()) {
                MstFormQuestion question = new MstFormQuestion();
                if (questionRequest.getQuestionId() != null) {
                    Optional<MstFormQuestion> existingQ = mstFormQuestionRepository.findById(questionRequest.getQuestionId());
                            if (existingQ.isPresent()) {
                                question = existingQ.get();
                                question.setForm(existingForm);
                                question.setQuestionLabel(questionRequest.getQuestionLabel());
                                question.setQuestionName(questionRequest.getQuestionName());
                                question.setDescription(questionRequest.getDescription());
                                question.setAnswerSelect(questionRequest.getAnswerSelect());
                                question.setRequireAnswer("Yes".equals(questionRequest.getRequireAnswer()) ? 1 : 0);
                                question.setIsDeleted(false);
                                mstFormQuestionRepository.save(question);
                                if ((questionRequest.getAnswers()).size() > 0) {
                                    for (UpdateFormRequest.QuestionRequest.AnswerRequest answerRequest : questionRequest.getAnswers()){
                                        Answers answer = new Answers();
                                        if (answerRequest.getAnswerId() == null){
                                            answer.setOptionText(answerRequest.getOptionText());
                                            answer.setFormId(existingForm.getId());
                                            answer.setQuestion(question);
                                        } else {
                                            Optional<Answers> existingA = answersRepository.findById(answerRequest.getAnswerId());
                                            if (existingA.isPresent()) {
                                                answer = existingA.get();
                                                answer.setQuestion(question);
                                                answer.setOptionText(answerRequest.getOptionText());
                                                answer.setIsDeleted(false);
                                                answer.setFormId(existingForm.getId());
                                            }
                                        }
                                        answersRepository.save(answer);
                                    }
                                }
                            } else {
                                throw new NotFoundException("Question not found for ID: " + questionRequest.getQuestionId());
                            }
                } else {
                    question.setForm(existingForm);
                    question.setQuestionLabel(questionRequest.getQuestionLabel());
                    question.setQuestionName(questionRequest.getQuestionName());
                    question.setDescription(questionRequest.getDescription());
                    question.setAnswerSelect(questionRequest.getAnswerSelect());
                    question.setRequireAnswer("Yes".equals(questionRequest.getRequireAnswer()) ? 1 : 0);
                    question.setIsDeleted(false);
                    mstFormQuestionRepository.save(question);
                    if ((questionRequest.getAnswers()).size() > 0) {
                        for (UpdateFormRequest.QuestionRequest.AnswerRequest answerRequest : questionRequest.getAnswers()) {
                            Answers answer = new Answers();
                            answer.setOptionText(answerRequest.getOptionText());
                            answer.setFormId(existingForm.getId());
                            answer.setQuestion(question);
                            answersRepository.save(answer);
                        }
                    }
                }
            }
        }

//        try {
//            String accessToken = request.getHeader("Authorization");
//            String jwtToken = accessToken.substring(7);
//            getLoginUser(jwtToken);
//
//            // Retrieve existing form
//            Optional<MstForm> optionalForm = mstFormRepository.findById(formId);
//            if (optionalForm.isPresent()) {
//                MstForm existingForm = optionalForm.get();
//
//                // Soft delete existing questions and answers
//                try {
//                    for (MstFormQuestion existingQuestion : existingForm.getQuestions()) {
//                        existingQuestion.setIsDeleted(true);
//                        if (existingQuestion.getAnswers() != null) {
//                            for (Answers existingAnswer : existingQuestion.getAnswers()) {
//                                existingAnswer.setIsDeleted(true);
//                            }
//                        }
//                    }
//                } catch (Exception e) {
//                    throw new RuntimeException("Error while soft deleting existing questions and answers", e);
//                }
//
//                // Update form details
//                try {
//                    existingForm.setTitle(params.getFormDetails().getTitleText());
//                    existingForm.setAliasName(params.getFormDetails().getAliasName());
//                    existingForm.setModuleId(params.getFormDetails().getModuleId());
//                    existingForm.setCharacteristicId(params.getFormDetails().getCharacteristicsId());
//                    existingForm.setSubCharacteristicId(params.getFormDetails().getSubCharacteristicsId());
//                    existingForm.setRecurrenceId(params.getFormDetails().getRecurrenceId());
//                    existingForm.setMonthId(params.getFormDetails().getMonthId());
//                    existingForm.setCompliancePeriod(params.getFormDetails().getCompliancePeriod());
//                    existingForm.setEffectiveDate(params.getFormDetails().getDateFrom());
//                    existingForm.setText(params.getFormDetails().getTextEnglish());
//                    existingForm.setModifyBy(currentSession.getId());
//                } catch (Exception e) {
//                    throw new RuntimeException("Error while updating form details", e);
//                }
//
//                // Convert QuestionRequest to MstFormQuestion and handle the updates
//                try {
//                    for (UpdateFormRequest.QuestionRequest questionRequest : params.getQuestions()) {
//                        MstFormQuestion question = new MstFormQuestion();
//
//                        if (questionRequest.getQuestionId() != null) {
//                            // Check if the question already exists in the database
//                            Optional<MstFormQuestion> existingQ = mstFormQuestionRepository.findById(questionRequest.getQuestionId());
//                            if (existingQ.isPresent()) {
//                                question = existingQ.get();
//                            } else {
//                                // Handle case where the question ID is provided but not found (optional)
//                                throw new NotFoundException("Question not found for ID: " + questionRequest.getQuestionId());
//                            }
//                        }
//
//                        question.setForm(existingForm);
//                        question.setQuestionLabel(questionRequest.getQuestionLabel());
//                        question.setQuestionName(questionRequest.getQuestionName());
//                        question.setDescription(questionRequest.getDescription());
//                        question.setAnswerSelect(questionRequest.getAnswerSelect());
//                        question.setRequireAnswer("Yes".equals(questionRequest.getRequireAnswer()) ? 1 : 0);
//                        question.setIsDeleted(false);
//
//                        // Initialize answers list if null
//                        if (question.getAnswers() == null) {
//                            question.setAnswers(new ArrayList<>());
//                        }
//
//                        // Check if answers are provided in the request
//                        if (questionRequest.getAnswers() != null) {
//                            for (UpdateFormRequest.QuestionRequest.AnswerRequest answerRequest : questionRequest.getAnswers()) {
//                                Answers answer = new Answers();
//
//                                if (answerRequest.getAnswerId() != null) {
//                                    // Check if the answer already exists in the database
//                                    Optional<Answers> existingA = answersRepository.findById(answerRequest.getAnswerId());
//                                    if (existingA.isPresent()) {
//                                        answer = existingA.get();
//                                    } else {
//                                        // Handle case where the answer ID is provided but not found (optional)
//                                        throw new NotFoundException("Answer not found for ID: " + answerRequest.getAnswerId());
//                                    }
//                                }
//
//                                answer.setQuestion(question);
//                                answer.setOptionText(answerRequest.getOptionText());
//                                answer.setIsDeleted(false);
//
//                                // Save new answer if it's a new entity
//                                if (answer.getId() == null) {
//                                    try {
//                                        answersRepository.save(answer);
//                                        question.getAnswers().add(answer); // Add answer to question's answers list
//                                    } catch (Exception e) {
//                                        throw new RuntimeException("Error while saving new answer", e);
//                                    }
//                                }
//                            }
//                        }
//
//                        // Add the question to existingForm's questions list if it's a new question
//                        if (question.getId() == null) {
//                            existingForm.getQuestions().add(question);
//                        }
//                    }
//
//                    // Save the updated form after processing all questions
//                    mstFormRepository.save(existingForm);
//
//                } catch (Exception e) {
//                    throw new RuntimeException("Error while updating questions and answers", e);
//                }
//
//                // Save the updated form
//                try {
//                    mstFormRepository.save(existingForm);
//                } catch (Exception e) {
//                    throw new RuntimeException("Error while saving the updated form", e);
//                }
//
//            } else {
//                throw new NotFoundException("Form not found");
//            }
//        } catch (NotFoundException e) {
//            // Handle specific exception for form not found
//            throw e;
//        } catch (Exception e) {
//            // Handle any other exceptions
//            throw new RuntimeException("Error occurred during form update", e);
//        }
    }


    @Override
    public List<Object> getCompleteForm(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7);
        getLoginUser(jwtToken);
        return userFillFormDateRepository.getFillForm(currentSession.getId());
    }

    @Override
    public CompletedFormResponse completeFormPreview(HttpServletRequest request, Long formId) {
        // Extract JWT token from Authorization header
        String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7); // Assuming "Bearer " prefix
        getLoginUser(jwtToken);

        // Retrieve all questions related to the form
        List<MstFormQuestion> allQuestions = mstFormQuestionRepository.findByFormId(formId);

        // Retrieve user form data for the current user and form
        List<UserFormData> userFormDataList = userFormDataRepository.findByUserIdAndFormId(currentSession.getId(), formId);


        // Create a map to store user form data by question ID for quick lookup
        Map<Long, List<UserFormData>> userFormDataMap = new HashMap<>();
        for (UserFormData userFormData : userFormDataList) {
            userFormDataMap.computeIfAbsent(userFormData.getQuestion().getId(), k -> new ArrayList<>()).add(userFormData);
        }

        UserFillFormDate userFillFormDate = userFillFormDateRepository.getFillFormDate(currentSession.getId(), formId);
        CompletedFormResponse response = new CompletedFormResponse();
        response.setCompletedDate(userFillFormDate.getDate());
        // Set the form title and text if user form data exists
        if (!userFormDataList.isEmpty()) {
            MstForm form = userFormDataList.get(0).getForm();
            response.setTitle(form.getTitle());
            response.setText(form.getText());
        } else if (!allQuestions.isEmpty()) {
            // Use the form details from the questions list if user form data is empty
            MstForm form = allQuestions.get(0).getForm();
            response.setTitle(form.getTitle());
            response.setText(form.getText());
        }

        // Prepare list of question DTOs for the response
        // Prepare list of question DTOs for the response
        List<CompletedFormResponse.QuestionDTO> questionDTOs = new ArrayList<>();
        for (MstFormQuestion question : allQuestions) {
            List<UserFormData> userFormDataListForQuestion = userFormDataMap.getOrDefault(question.getId(), new ArrayList<>());
            List<String> answers = new ArrayList<>();

            if (!userFormDataListForQuestion.isEmpty()) {
                for (UserFormData userFormData : userFormDataListForQuestion) {
                    if (userFormData.getAnswers() != null) {
                        // Fetch answer value from Answers table if answer ID is present
                        answers.add(userFormData.getAnswers().getOptionText());
                    } else {
                        // If answer ID is not present, use value from UserFormData
                        answers.add(userFormData.getValue() != null ? userFormData.getValue() : "User not filled");
                    }
                }
            } else {
                // If no userFormData exists for this question, indicate user has not filled it
                answers.add("User not filled");
            }

            questionDTOs.add(new CompletedFormResponse.QuestionDTO(
                    question.getQuestionLabel(),
                    question.getQuestionName(),
                    question.getRequireAnswer() == 1 ? "Yes" : "No",
                    answers
            ));
        }

        response.setQuestions(questionDTOs);
        return response;

    }

    public void getLoginUser(String Token) {
        String email = jwtUtil.extractUsername(Token);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User existingUser = user.get();
            currentSession.setId(existingUser.getId());
            currentSession.setEmail(existingUser.getEmail());
            currentSession.setRole(existingUser.getRole());
            currentSession.setContact(existingUser.getContact());
            currentSession.setGender(existingUser.getGender());
            currentSession.setFirstName(existingUser.getFirstName());
            currentSession.setLastName(existingUser.getLastName());
        }
    }
}
