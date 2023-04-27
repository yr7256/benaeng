package com.ssafy.benaeng.domain.food.ResponseDto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor(staticName = "of")
public class CommonDto <T>{
    private final String resultCode;
    private final String message;
    private final T data;
}
