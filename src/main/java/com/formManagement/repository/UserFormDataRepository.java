package com.formManagement.repository;

import com.formManagement.Entity.UserFormData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFormDataRepository extends JpaRepository<UserFormData , Long> {

    @Query("SELECT ufd FROM UserFormData ufd " +
            "LEFT JOIN FETCH ufd.question q " +
            "LEFT JOIN FETCH ufd.answers a " +
            "WHERE ufd.user.id = :userId AND ufd.form.id = :formId")
    List<UserFormData> findByUserIdAndFormId(@Param("userId") Long userId, @Param("formId") Long formId);
}
