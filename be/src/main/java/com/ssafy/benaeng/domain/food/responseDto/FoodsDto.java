package com.ssafy.benaeng.domain.food.responseDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.benaeng.domain.food.entity.MyFood;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class FoodsDto {
    private Long foodId;
    private String foodName;
    private Long foodCategoryId;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date startDate;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date endDate;

    private int totalCount;
    private int count;
}
