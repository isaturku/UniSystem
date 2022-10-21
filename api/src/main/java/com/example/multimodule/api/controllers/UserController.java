package com.example.multimodule.api.controllers;

import com.example.multimodule.service.model.User;
import com.example.multimodule.service.model.UserRegistrationRequest;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.multimodule.service.services.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping(value = "/api/users")
@Log4j2
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getUsers()
    {
        return service.getAllUsers();
    }
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void registerUser(@RequestBody UserRegistrationRequest registrationRequest){
        log.info(registrationRequest.fName());
        service.registerUser(registrationRequest);
    }
    @PutMapping()
    @PreAuthorize("hasRole('ROLE_USER')")
    public void changePassword(Principal principal,@RequestBody String newPassword){
        service.updatePassword(principal.getName(),newPassword);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable(name = "userId") String username){
        service.deleteUser(username);
    }
}
