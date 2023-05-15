package com.ssafy.benaeng.domain.food.responseDto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class FcmAlamDto {
    private String deviceToken;
    private Integer imminentCnt;
    private Integer expirationCnt;
    private Integer periodCnt;
}
