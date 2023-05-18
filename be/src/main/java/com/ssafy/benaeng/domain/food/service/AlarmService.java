package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;
import com.ssafy.benaeng.domain.food.responseDto.FcmAlarmDto;

import java.util.List;

public interface AlarmService {
    List<AlarmDto> getAlarmList(Long userId);
    List<FcmAlarmDto> getFcmAlarmList();
    void updateAlarm(Long userId);
}
