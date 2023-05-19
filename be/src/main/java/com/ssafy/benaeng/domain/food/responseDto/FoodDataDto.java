package com.ssafy.benaeng.domain.food.responseDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
public class FoodDataDto {
    private Long foodCategoryId;
    private String foodName;
    private String pogDaycnt;
    private Long foodId;

}
