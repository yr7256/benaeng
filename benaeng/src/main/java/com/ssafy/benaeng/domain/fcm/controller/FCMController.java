package com.ssafy.benaeng.domain.fcm.controller;

import com.ssafy.benaeng.domain.fcm.service.FCMService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fcm")
public class FCMController {
    private final FCMService fcmService;

    @PostMapping
    public void getToken(@RequestBody Map<String, String> request) {
    }
}
