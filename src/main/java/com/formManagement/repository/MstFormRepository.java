package com.formManagement.repository;

import com.formManagement.Entity.Answers;
import com.formManagement.Entity.MstForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MstFormRepository extends JpaRepository<MstForm,Long> {
    Optional<MstForm> findTopByOrderByIdDesc();

    @Query(nativeQuery = true , value = "SELECT id, form_id ,title , active FROM mst_form WHERE active != 9")
    List<Object> getFormDetails();


    @Query("SELECT f FROM MstForm f LEFT JOIN FETCH f.questions q WHERE f.id = :formId AND q.isDeleted = false")
    MstForm findFormWithQuestions(@Param("formId") Long formId);

    @Query("SELECT a FROM Answers a WHERE a.question.id IN :questionIds AND a.isDeleted = false")
    List<Answers> findAnswersByQuestionIds(@Param("questionIds") List<Long> questionIds);

    @Query(nativeQuery = true, value = "SELECT f.id, f.title FROM mst_form f LEFT JOIN user_form_data uf ON f.id = uf.form_id AND uf.user_id = :userId WHERE uf.id IS NULL AND f.active = 1" )
    List<Object> findFormsNotFilledByUser(@Param("userId") Long userId);

//    Get Answer Types
    @Query(nativeQuery = true, value = "SELECT answer_type_id,answer_type_name FROM mst_answer_type WHERE active = 1;")
    List<Object> getAnswerTypes();

//Get Module Data
    @Query(nativeQuery = true, value = "SELECT m.module_id , m.module_name FROM mst_module m where m.active = 1")
    List<Object> getModule();

//    Get Characteristics
    @Query(nativeQuery = true, value = "SELECT m.characteristic_id, c.characteristic as characteristic from mst_module_characteristics_mapping m left join mst_characteristics c on c.characteristic_id = m.characteristic_id  where module_id = :id; ")
    List<Object> getCharacteristics(int id);

//    Get SubCharacteristics
    @Query(nativeQuery = true , value = "SELECT sub_characteristic_id, sub_characteristic  from mst_subcharacteristics where characteristic_id = :id")
    List<Object> getSubCharacteristics(int id);

//    Get Recurrence
    @Query(nativeQuery = true, value = "SELECT  recurrance_id, recurrance_name FROM mst_recurrance WHERE active = 1;")
    List<Object> getRecurrence();

//    Get Months Data
    @Query(nativeQuery = true, value = "SELECT month_id , month_name FROM mst_month WHERE active = 1")
    List<Object> getMonths();


}
