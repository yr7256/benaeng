package com.ssafy.benaeng.global.config;

import com.ssafy.benaeng.global.util.notification.MatterMostSender;
import com.ssafy.benaeng.global.util.notification.NotificationSender;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ApplicationConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public NotificationSender notificationSender() {
        return new MatterMostSender(restTemplate());
    }
}
