package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.repository.alarm.AlarmRepository;
import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
}
