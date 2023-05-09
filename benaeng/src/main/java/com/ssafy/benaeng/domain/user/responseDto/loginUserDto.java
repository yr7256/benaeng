package com.ssafy.benaeng.domain.user.responseDto;

import lombok.*;

@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Getter
@Builder
public class loginUserDto {
    private Boolean isDark;

    private Boolean isAlarm;

    private  Boolean isPurchase;

    private  Boolean isCycle;
    private String accessToken;
}
