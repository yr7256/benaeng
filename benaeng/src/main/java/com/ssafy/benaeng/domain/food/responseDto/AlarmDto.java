package com.ssafy.benaeng.domain.food.responseDto;

import lombok.*;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class AlarmDto {
    private Integer type;
    private Integer status;
    private Date createDate;
    private Integer dDay;
    private String foodName;
    private Long foodId;
    private Long foodCategoryId;
}
