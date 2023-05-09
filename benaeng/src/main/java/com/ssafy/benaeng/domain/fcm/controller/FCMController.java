package com.ssafy.benaeng.domain.fcm.controller;

import com.ssafy.benaeng.domain.fcm.service.FCMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fcm")
public class FCMController {
    private final FCMService fcmService;

    @PostMapping
    public void getToken(@AuthenticationPrincipal String userId, @RequestBody Map<String, String> request) {
        log.info("user id = {}", userId);
        log.info("device token = {}", request.get("deviceToken"));
    }
}
