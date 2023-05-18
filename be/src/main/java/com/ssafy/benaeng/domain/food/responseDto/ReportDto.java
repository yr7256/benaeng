package com.ssafy.benaeng.domain.food.responseDto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class ReportDto {
    private Long discard;
    private Long purchase;
    private Long consume;
    private List<Map.Entry<String , Long>> discardTopThreeCategory = new ArrayList<>();
    private List<Map.Entry<String , Long>> favoriteTopThreeCategory = new ArrayList<>();
}
