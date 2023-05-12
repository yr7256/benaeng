package com.ssafy.benaeng.domain.food.repository.alarm;

import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface AlarmRepositoryCustom {
    List<AlarmDto> getAlarmList(Long userId);
}
