package com.ssafy.benaeng.domain.food.responseDto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class CalendarDetailDto {
    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class CalData {
        public Long foodCategoryId;
        public String foodName;
        public List<String> purchaseRecords = new ArrayList<>();
    }
    List<CalData> purchase = new ArrayList<>();

}