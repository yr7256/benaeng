package com.ssafy.benaeng.global.util.notification;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public interface NotificationSender {
    void sendNotification(HttpServletRequest request, Exception e);
}