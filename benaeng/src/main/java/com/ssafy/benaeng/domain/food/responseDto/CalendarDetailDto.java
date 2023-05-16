package com.ssafy.benaeng.domain.food.responseDto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class CalendarDetailDto {
    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class CalInfo {
        public Long foodCategoryId;
        public String foodName;
        public List<String> purchaseRecords = new ArrayList<>();
        public Long purchaseCycle;
    }
    List<CalInfo> calData = new ArrayList<>();

}