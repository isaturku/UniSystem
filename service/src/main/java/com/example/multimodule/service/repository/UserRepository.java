package com.example.multimodule.service.repository;

import com.example.multimodule.service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,String> {
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = ?2 where u.username = ?1")
    void updatePasswordByUsername(String username,String newPassword);

}
