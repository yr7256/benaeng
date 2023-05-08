package com.ssafy.benaeng.domain.fcm.controller;

import com.ssafy.benaeng.domain.fcm.service.FCMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fcm")
public class FCMController {
    private final FCMService fcmService;

    @PostMapping
    public void getToken(@RequestBody Map<String, String> request) {
        log.info("{}", request.get("deviceToken"));
    }
}
