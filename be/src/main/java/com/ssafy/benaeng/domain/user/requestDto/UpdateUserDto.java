package com.ssafy.benaeng.domain.user.requestDto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class UpdateUserDto {
    private Boolean isDark;
    private Boolean isAlarm;
    private Boolean isPurchase;
    private Boolean isCycle;
}
