package com.ssafy.benaeng.domain.food.controller;

import com.ssafy.benaeng.domain.food.service.AlarmService;
import com.ssafy.benaeng.global.responseDto.CommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AlarmController {
    private final AlarmService alarmService;
    @GetMapping("/alarm")
    public CommonDto<Object> getAlarmList(@AuthenticationPrincipal String userId){
        Long id = Long.parseLong(userId);
        try{
            return CommonDto.of("200", "사용자 알람 리스트 획득 성공", alarmService.getAlarmList(id));
        }catch (Exception e){
            return CommonDto.of("400", "사용자 알람 리스트 획득 실패", e.getMessage());
        }
    }
}
