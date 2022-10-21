package com.example.multimodule.service.security;

import com.example.multimodule.service.services.UserService;
import com.example.multimodule.service.model.JwtRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class TokenService {

    private final JwtUtil jwtUtil;
    private final JpaUserDetailsService service;
    private final AuthenticationManager authenticationManager;

    public TokenService(JwtUtil jwtUtil, JpaUserDetailsService service, AuthenticationManager authenticationManager, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.service = service;
//        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }
    public String createJwtToken(JwtRequest jwtRequest) throws Exception {
        String userName = jwtRequest.getUserName();
        log.info(userName);
        String userPassword = jwtRequest.getUserPassword();
        log.info(userPassword);
        authenticate(userName, userPassword);

        UserDetails userDetails = service.loadUserByUsername(userName);
        return jwtUtil.generateToken(userDetails);

    }
    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
