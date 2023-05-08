package com.ssafy.benaeng.domain.user.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Builder
public class UpdateUserDto {
    private Boolean isDark;
    private Boolean isAlarm;
    private Boolean isPurchase;
    private Boolean isCycle;
}
