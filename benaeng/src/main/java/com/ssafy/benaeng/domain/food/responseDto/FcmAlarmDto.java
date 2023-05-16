package com.ssafy.benaeng.domain.food.responseDto;


import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FcmAlarmDto {
    private String deviceToken;
    private Integer imminentCnt;
    private Integer expirationCnt;
    private Integer periodCnt;
}
