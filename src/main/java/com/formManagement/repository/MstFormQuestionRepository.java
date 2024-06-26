package com.formManagement.repository;

import com.formManagement.Entity.MstForm;
import com.formManagement.Entity.MstFormQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MstFormQuestionRepository extends JpaRepository<MstFormQuestion , Long> {

    @Query(nativeQuery = true , value = "SELECT * from mst_form_question WHERE form_id = :formId; ")
    List<MstFormQuestion> getQuestionList(Long formId);

    List<MstFormQuestion> findByForm(MstForm savedForm);

    @Query("SELECT q FROM MstFormQuestion q WHERE q.form.id = :formId AND q.isDeleted = false")
    List<MstFormQuestion> findByFormId(@Param("formId") Long formId);
}
