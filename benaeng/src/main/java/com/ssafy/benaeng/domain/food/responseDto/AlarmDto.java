package com.ssafy.benaeng.domain.food.responseDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class AlarmDto {
    private Integer type;
    private Integer status;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createDate;
    private Integer dDay;
    private String foodName;
    private Long foodId;
    private Long foodCategoryId;
}
