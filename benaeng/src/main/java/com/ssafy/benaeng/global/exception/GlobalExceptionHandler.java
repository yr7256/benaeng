package com.ssafy.benaeng.global.exception;

import com.ssafy.benaeng.global.util.notification.NotificationSender;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler {
    private final NotificationSender notificationSender;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(HttpServletRequest request, Exception e) {
        notificationSender.sendNotification(request, e);
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        Map<String, String> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", "400");
        response.put("error", e.getMessage());
        response.put("path", request.getRequestURI());
        return new ResponseEntity<>(response, httpHeaders, httpStatus);
    }
}
