package com.ssafy.benaeng.domain.fcm.controller;

import com.ssafy.benaeng.domain.fcm.service.FCMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> setUserDeviceToken(@AuthenticationPrincipal String userId, @RequestBody Map<String, String> request) {
        fcmService.setUserDeviceToken(Long.valueOf(userId), request.get("deviceToken"));
        return ResponseEntity.ok().body("사용자 디바이스 토큰 저장 성공");
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendAlarm(@RequestBody Map<String, String> request) {
        try {
            fcmService.sendMessageTo(request.get("deviceToken"));
            return ResponseEntity.ok().body("전송에 성공하였습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("전송에 실패하였습니다.");
        }
    }
}
