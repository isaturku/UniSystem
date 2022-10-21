package com.example.multimodule.application;

import com.example.multimodule.service.services.UserService;
import com.example.multimodule.service.config.RsaKeyProperties;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication(scanBasePackages = "com.example.multimodule")
@EnableJpaRepositories("com.example.multimodule.service.repository")
@EntityScan("com.example.multimodule.service.model")
@ConfigurationPropertiesScan(basePackages = "com.example.multimodule.service.config")
@Log4j2
public class LibraryApplication {
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(LibraryApplication.class, args);
	}
	CommandLineRunner commandLineRunner(UserService userService){
		return args -> {
//			userService.registerUser("bibliotekar","John","Doe", passwordEncoder().encode("password"));
		};
	}

}
