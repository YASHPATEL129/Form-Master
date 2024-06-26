package com.formManagement.repository;

import com.formManagement.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query(nativeQuery = true , value = "SELECT * FROM user WHERE active != 9")
    List<User> getAllUsers();

    @Query(nativeQuery = true , value = "SELECT * FROM user WHERE active != 9 AND email = :email")
    User findByEmailWithActive(String email);


//    @Query(nativeQuery = true, value = "SELECT * FROM user WHERE " +
//            "( :role IS NULL OR role = :role) AND " +
//            "(:searchValue IS NULL OR " +
//            "contact LIKE %:searchValue% OR " +
//            "email LIKE %:searchValue% OR " +
//            "first_name %:searchValue% OR " +
//            "gender LIKE %:searchValue% OR " +
//            "last_name LIKE %:searchValue% OR " +
//            "role LIKE %:searchValue% OR " +
//            "valid_form %:searchValue% OR " +
//            "valid_to LIKE %:searchValue%);")
//    List<User> findByRoleAndSearchValue(@Param("role") String role, @Param("searchValue") String searchValue);


    @Query(nativeQuery = true, value = "SELECT * FROM user WHERE " +
            "(:role IS NULL OR role = :role) AND " +
            "(:searchValue IS NULL OR " +
            "contact LIKE CONCAT('%', :searchValue, '%') OR " +
            "email LIKE CONCAT('%', :searchValue, '%') OR " +
            "first_name LIKE CONCAT('%', :searchValue, '%') OR " +
            "gender LIKE CONCAT('%', :searchValue, '%') OR " +
            "last_name LIKE CONCAT('%', :searchValue, '%') OR " +
            "role LIKE CONCAT('%', :searchValue, '%') OR " +
            "valid_form LIKE CONCAT('%', :searchValue, '%') OR " +
            "valid_to LIKE CONCAT('%', :searchValue, '%'))")
    List<User> findByRoleAndSearchValue(@Param("role") String role, @Param("searchValue") String searchValue);

}
