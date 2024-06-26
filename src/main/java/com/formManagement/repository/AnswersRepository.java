package com.formManagement.repository;

import com.formManagement.Entity.Answers;
import com.formManagement.Entity.MstFormQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswersRepository extends JpaRepository<Answers,Long> {

    List<Answers> findByQuestionId(Long questionId);

    @Query(nativeQuery = true , value = "SELECT answer_type_name from mst_answer_type where answer_type_id = :id;")
    String getAnswerTypes(Long id);

    List<Answers> findByQuestion(MstFormQuestion mstFormQuestion);

    Optional<Answers> findByQuestionAndOptionText(MstFormQuestion mstFormQuestion, String optionText);
}
