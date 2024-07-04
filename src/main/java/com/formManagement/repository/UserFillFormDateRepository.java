package com.formManagement.repository;


import com.formManagement.Entity.UserFillFormDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFillFormDateRepository extends JpaRepository<UserFillFormDate, Long> {


    @Query(nativeQuery = true , value = "SELECT uf.date,f.form_id, f.title, u.first_name , u.last_name , uf.form_id FROM user_fill_form_date uf LEFT JOIN mst_form f on f.id = uf.form_id LEFT JOIN user u on uf.user_id = u.id  WHERE uf.user_id =:userId AND  f.active != 9; ")
    List<Object> getFillForm(Long userId);

    @Query(nativeQuery = true , value = "SELECT * from user_fill_form_date WHERE form_id = :formId and user_id = :userId")
    UserFillFormDate getFillFormDate(Long userId, Long formId);

    @Query(nativeQuery = true , value = "SELECT uf.user_id  ,uf.date,f.form_id, f.title, u.first_name , u.last_name , uf.form_id FROM user_fill_form_date uf LEFT JOIN mst_form f on f.id = uf.form_id LEFT JOIN user u on uf.user_id = u.id WHERE f.active != 9; ")
    List<Object> getFillFormAdmin();

}
