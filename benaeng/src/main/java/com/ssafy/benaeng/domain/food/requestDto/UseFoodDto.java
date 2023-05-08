package com.ssafy.benaeng.domain.food.requestDto;

import lombok.Data;

@Data
public class UseFoodDto {
    private Long userId;
    private Long myFoodID;
    private int count;
}
