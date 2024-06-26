package com.formManagement.controller;

import com.formManagement.consts.ErrorKeys;
import com.formManagement.consts.Message;
import com.formManagement.exception.InvalidCredentialsException;
import com.formManagement.param.CreateFormParam;
import com.formManagement.param.UpdateFormRequest;
import com.formManagement.response.GetFormIdResponse;
import com.formManagement.response.Success;
import com.formManagement.service.FormService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
public class FormServiceController {

    @Autowired
    private FormService formService;

    @GetMapping("/getAllModules")
    public ResponseEntity<Success<?>> getAllModules(){

        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getModule());
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getCharacteristics/{id}")
    public ResponseEntity<Success<?>> getCharacteristics(@PathVariable int id){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getCharacteristics(id));
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getSubcharacteristics/{id}")
    public ResponseEntity<Success<?>> getSubcharacteristics(@PathVariable int id){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getSubcharacteristics(id));
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getRecurrance")
    public ResponseEntity<Success<?>> getRecurrance(){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getRecurrance());
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getMonths")
    public ResponseEntity<Success<?>> getMonths(){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getMonths());
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getFormId")
    public ResponseEntity<Success<?>> getFormId(){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        GetFormIdResponse data = formService.getFormId();
        Success<?> success = new Success<>();
        success.setData(data);
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getAnswersTypes")
    public ResponseEntity<Success<?>> getAnswersTypes(){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getAnswersTypes());
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @PostMapping("/createQuestion")
    public ResponseEntity<Success<?>> createForm(@RequestBody CreateFormParam formRequest,
                                                 HttpServletRequest request) {

        try {
            formService.CreateForm(request, formRequest.getFormDetails(), formRequest.getQuestions());
            ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
            Success<?> success = new Success<>();
            success.setData(formService.getAnswersTypes());
            success.setMessage(Message.FORM_CREATE_SUCCESSFUL);
            return respBuilder.body(success);
        } catch (Exception e) {
            throw new InvalidCredentialsException(Message.FORM_NOT_CREATED, ErrorKeys.FORM_NOT_CREATED);
        }
    }

    @GetMapping("/getFormDetails")
    public ResponseEntity<Success<?>> getFormDetails(){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getFormDetails());
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }




    @GetMapping("/getFormWithQuestion/{id}")
    public ResponseEntity<Success<?>> getFormWithQuestion(@PathVariable Long id){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getFormWithQuestionsAndAnswers(id));
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @DeleteMapping("/deleteForm/{id}")
    public ResponseEntity<Success<?>> deleteForm(@PathVariable Long id){
        formService.deleteForm(id);
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setMessage(Message.FORM_DELETE_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/getNotFillForm")
    public ResponseEntity<Success<?>> getNotFillForm(HttpServletRequest request){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData(formService.getNotFillForm(request));
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }


        @PutMapping("/updateForm/{formId}")
    public ResponseEntity<Success<?>> updateForm(@PathVariable Long formId,
                                                 @RequestBody UpdateFormRequest updateFormRequest,
                                                 HttpServletRequest request) {

//        try {
            formService.updateForm(request,formId,updateFormRequest);
            ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
            Success<?> success = new Success<>();
            success.setMessage(Message.FORM_UPDATE_SUCCESSFUL);
            return respBuilder.body(success);
//        } catch (Exception e) {
//            throw new InvalidCredentialsException(Message.FORM_NOT_UPDATE, ErrorKeys.FORM_NOT_UPDATE);
//        }
    }


    @GetMapping("/getCompleteForm")
    public ResponseEntity<Success<?>> getCompleteForm(HttpServletRequest request){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.getCompleteForm(request));
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }

    @GetMapping("/completeFormPreview/{formId}")
    public ResponseEntity<Success<?>> completeFormPreview(HttpServletRequest request, @PathVariable Long formId){
        ResponseEntity.BodyBuilder respBuilder = ResponseEntity.ok();
        Success<?> success = new Success<>();
        success.setData( formService.completeFormPreview(request, formId));
        success.setMessage(Message.DATA_GET_SUCCESSFUL);
        return respBuilder.body(success);
    }
}