package com.ssafy.benaeng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//@SpringBootApplication
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class BenaengApplication {

	public static void main(String[] args) {
		SpringApplication.run(BenaengApplication.class, args);
	}

}
