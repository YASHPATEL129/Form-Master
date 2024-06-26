package com.formManagement.service.impl;

import com.formManagement.Entity.*;
import com.formManagement.param.FormSubmissionDto;
import com.formManagement.service.UserFormDataService;
import com.formManagement.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserFormDataServiceImpl extends BaseService implements UserFormDataService {


    @Autowired
    JwtUtil jwtUtil;

    @Override
    public void saveUserFormData(HttpServletRequest request ,FormSubmissionDto formSubmissionDto) {
            String accessToken = request.getHeader("Authorization");
        String jwtToken = accessToken.substring(7);
        String email = jwtUtil.extractUsername(jwtToken);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User existingUser = user.get();
            currentSession.setId(existingUser.getId());
        }
        MstForm form = mstFormRepository.findById(formSubmissionDto.getFormId()).orElseThrow();

        for (FormSubmissionDto.AnswerDto answerDto : formSubmissionDto.getAnswers()) {
            MstFormQuestion question = mstFormQuestionRepository.findById(answerDto.getQuestionId()).orElseThrow();
            UserFormData userFormData = new UserFormData();

            userFormData.setForm(form);
            userFormData.setQuestion(question);
            userFormData.setUser(user.get());

            if (answerDto.getAnswerId() != null) {
                Answers answer = answersRepository.findById(answerDto.getAnswerId()).orElseThrow();
                userFormData.setAnswers(answer);
            }

            userFormData.setValue(answerDto.getValue());
            userFormDataRepository.save(userFormData);


        }
        UserFillFormDate userFillFormDate = new UserFillFormDate();
        userFillFormDate.setUserId(user.get().getId());
        userFillFormDate.setFormId(form.getId());
        DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        userFillFormDate.setDate(formatter.format(new Date()));
        userFillFormDateRepository.save(userFillFormDate);
    }
}
