package com.ssafy.benaeng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BenaengApplication {

	public static void main(String[] args) {
		SpringApplication.run(BenaengApplication.class, args);
	}

}
