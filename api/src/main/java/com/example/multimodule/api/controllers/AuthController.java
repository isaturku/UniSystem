package com.example.multimodule.api.controllers;

import com.example.multimodule.service.model.JwtRequest;
import com.example.multimodule.service.security.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@Log4j2
@RequestMapping( "/api/auth")
public class AuthController {
    private final TokenService service;

    public AuthController(TokenService service) {
        this.service = service;
        log.info("Initiated!");
    }

    @Operation(summary = "Get JWT token which is used to authorize secured methods.")
    @PostMapping
    public String getToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return service.createJwtToken(jwtRequest);
    }
}
