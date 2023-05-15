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
    public static class Calendar {
        public Long foodCategoryId;
        public List<Date> purchaseRecords = new ArrayList<>();
        public int purchaseCycle;
    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Alarm {
        public Long foodCategoryId;
        public Long foodId;
        public int status;
        public int dDay;
    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Purchase {
        public Long foodCategoryId;
        public String foodName;
        public List<Date> purchaseRecords = new ArrayList<>();
    }

    List<Calendar> calendar = new ArrayList<>();
    List<Alarm> alarm  = new ArrayList<>();
    List<Purchase> purchase = new ArrayList<>();

}