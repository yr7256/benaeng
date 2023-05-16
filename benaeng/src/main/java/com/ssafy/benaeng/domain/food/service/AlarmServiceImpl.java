package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.repository.alarm.AlarmRepository;
import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;
import com.ssafy.benaeng.domain.food.responseDto.FcmAlarmDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmServiceImpl implements AlarmService{
    private final AlarmRepository alarmRepository;
    @Override
    public List<AlarmDto> getAlarmList(Long userId) {
        return alarmRepository.getAlarmList(userId);
    }

    @Override
    public void deleteByUserId(Long userId) {
        alarmRepository.deleteByUserId(userId);
    }
    @Override
    public List<FcmAlarmDto> getFcmAlarmList() {
        return alarmRepository.getFcmAlarmList();
    }
}
