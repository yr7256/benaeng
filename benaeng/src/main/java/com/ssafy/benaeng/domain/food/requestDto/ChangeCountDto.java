package com.ssafy.benaeng.domain.food.requestDto;

import lombok.Data;

@Data
public class ChangeCountDto {
    private Long myFoodId;
    private int count;
}
