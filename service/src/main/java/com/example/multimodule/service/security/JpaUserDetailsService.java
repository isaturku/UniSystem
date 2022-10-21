package com.example.multimodule.service.security;

import com.example.multimodule.service.model.SecurityUser;
import com.example.multimodule.service.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class JpaUserDetailsService implements UserDetailsService {

    UserRepository repo;
    @Autowired
    public JpaUserDetailsService(UserRepository userRepository){
        this.repo = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repo.findById(username)
                .map(SecurityUser::new)
                .orElseThrow(()-> {
                    log.error("Username not found!");
                    return new UsernameNotFoundException("Username not found: "+username);});
    }
}
