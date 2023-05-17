package com.ssafy.benaeng.domain.food.controller;

import com.ssafy.benaeng.domain.food.service.AlarmService;
import com.ssafy.benaeng.global.responseDto.CommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    @PutMapping("/alarm")
    public CommonDto<Object> updateAlarm(@AuthenticationPrincipal String userId){
        Long id = Long.parseLong(userId);
        try{
            alarmService.updateAlarm(id);
            return CommonDto.of("200", "사용자 알람 업데이트 성공", "성공");
        }catch (Exception e){
            return CommonDto.of("400", "사용자 알람 업데이트 실패", e.getMessage());
        }
    }
}
