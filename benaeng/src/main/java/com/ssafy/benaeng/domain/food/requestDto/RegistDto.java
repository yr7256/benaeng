package com.ssafy.benaeng.domain.food.requestDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class RegistDto {


    private String foodName;

    private Long foodCategoryId;

    private Long userId;

    private String barcode;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date startDate;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date endDate;

    private int totalCount;

    private Boolean isRecommend;
    private Boolean isConsume;
}
