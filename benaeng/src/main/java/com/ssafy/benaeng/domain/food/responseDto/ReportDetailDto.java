package com.ssafy.benaeng.domain.food.responseDto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class ReportDetailDto {
    private String subCategory;
    private int purchase;
    private int percent;
    private String msg;
    private int cycle;
    List<String> preferProducts = new ArrayList<>();
}
