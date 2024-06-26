package com.formManagement.service.impl;

import com.formManagement.repository.*;
import com.formManagement.response.CurrentSession;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseService {

    @Autowired
    MstFormRepository mstFormRepository;

    @Autowired
    AnswersRepository answersRepository;

    @Autowired
    MstFormQuestionRepository mstFormQuestionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserFillFormDateRepository userFillFormDateRepository;

    @Autowired
    UserFormDataRepository userFormDataRepository;

    @Autowired
    CurrentSession currentSession;
}