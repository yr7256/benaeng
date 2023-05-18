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
    private Long purchase =0L;
    private int percent =0;
    private List<String> msg = new ArrayList<>();
    private Long cycle =0L;
    List<String> preferProducts = new ArrayList<>();
}
