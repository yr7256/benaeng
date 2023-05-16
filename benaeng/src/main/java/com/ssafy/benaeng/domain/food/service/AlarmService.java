package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;
import com.ssafy.benaeng.domain.food.responseDto.FcmAlamDto;

import java.util.List;

public interface AlarmService {
    List<AlarmDto> getAlarmList(Long userId);

    void deleteByUserId(Long userId);
    List<FcmAlamDto> getFcmAlarmList();
}
