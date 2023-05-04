package com.ssafy.benaeng.domain.user.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class loginUserDto {
    private Boolean isDark;

    private Boolean isAlarm;

    private  Boolean isPurchase;

    private  Boolean isCycle;
}
