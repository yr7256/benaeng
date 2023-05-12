package com.ssafy.benaeng.domain.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class JwtToken {
    private String grantType;
    private String accessToken;

    @Override
    public String toString(){
        return grantType + accessToken;
    }
}
