package com.example.multimodule.service.services;

import com.example.multimodule.service.model.User;
import com.example.multimodule.service.model.UserRegistrationRequest;
import com.example.multimodule.service.repository.UserRepository;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private final  UserRepository repo;
    private final PasswordEncoder encoder;
    public UserService(UserRepository userRepository, PasswordEncoder encoder){
         this.repo = userRepository;
         this.encoder = encoder;
    }

    public List<User> getAllUsers(){
        return (List<User>) repo.findAll();
    }
    public void registerUser(UserRegistrationRequest userRegistrationRequest){
        User user = repo.save(new User( userRegistrationRequest.username(), userRegistrationRequest.fName(), userRegistrationRequest.lName(), encoder.encode(userRegistrationRequest.pass()), "ROLE_USER"));
    }
    public void updatePassword(String username, String newPassword){
        repo.updatePasswordByUsername(username,encoder.encode(newPassword));
    }
    public User getUserByUsename(String username){
        return repo.findById(username).orElse(null);
    }

    public void getFullNameByUsername(){

    }
    public void deleteUser(String username){
        repo.deleteById(username);
    }

}
