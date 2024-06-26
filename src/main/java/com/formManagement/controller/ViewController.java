package com.formManagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController { 

    @GetMapping("/masterForm")
    public String openForm() {
        return "master_form";
    }
    @GetMapping("/logIn")
    public String logIn(){
        return "index";
    }

    @GetMapping("/masterUser")
    public String masterUser(){
        return "master_users";
    }

    @GetMapping("/fillForms")
    public String fillForm(){
        return "fill_forms";
    }


    @GetMapping("/completeForms")
    public String completeForms(){
        return "completed_forms";
    }

    @GetMapping("/profile")
    public String profile(){
        return "profile";
    }
}
