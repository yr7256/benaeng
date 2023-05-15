package com.ssafy.benaeng.domain.food.responseDto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor

public class MonthReportDto {
    public static class MostUsed {
        public Long foodCategoryId;
        public Long consumer =0L;
        public Long waste = 0L ;
    }

    private int  countPurchase  = 0; // 월간 구매 식품
    private int countConsumer = 0 ; // 월간 소비 식품
    private int countWaste = 0 ;
    List<MostUsed> mostConsumer = new ArrayList<>();
    List<MostUsed> mostWaste = new ArrayList<>();




}
