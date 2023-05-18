package com.ssafy.benaeng.domain.food.responseDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.benaeng.domain.food.entity.NutrientInfo;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class FoodMoreInfoDto {
    private Long foodId;
    private String foodName;
    private Long foodCategoryId;
    private String middleCategory;
    private String subCategory;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date startDate;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private Date endDate;

    private int count;

    private int total;
    private NutrientInfo nutrientInfo;

    private Long purchase;
    private int percent;
    private List<String> msg  = new ArrayList<>();
    private Long cycle;
    private List<String> preferProducts = new ArrayList<>();
}
