package com.ssafy.benaeng.domain.user.responseDto;

import lombok.*;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Builder
public class UserDto {
    private Boolean isDark;

    private Boolean isAlarm;

    private  Boolean isPurchase;

    private  Boolean isCycle;
    private String accessToken;
}
