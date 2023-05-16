package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.entity.FoodCategory;
import com.ssafy.benaeng.domain.food.entity.FoodData;
import com.ssafy.benaeng.domain.food.entity.MyFood;
import com.ssafy.benaeng.domain.food.requestDto.ChangeCountDto;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.requestDto.StateDto;
import com.ssafy.benaeng.domain.food.requestDto.YearMonthDto;
import com.ssafy.benaeng.domain.food.responseDto.*;

import java.text.ParseException;
import java.util.List;

public interface FoodService {
    MyFood saveMyFood(RegistDto registDto);
    List<FoodsDto> findMyFoodList(Long userId);
    List<FoodCategory> findAllFoodCategory();
    void changeStateMyFood(StateDto stateDto) throws ParseException;
    void changeCountMyFood(ChangeCountDto changeCountDto);
    FoodMoreInfoDto getFoodMoreInfo(Long foodId);
    FoodDataDto getFoodData(String codeNumber);
    void savePurchase(MyFood myFood);
    ReportDto getReportInfo(Long userId);
    MonthReportDto getMonthReport(YearMonthDto yearMonthDto , Long userId);
<<<<<<< HEAD
    CalendarDetailDto getCalendarDetail(Long userId, int year, int month);
=======
>>>>>>> b8e1eb65511bbaf2fffe35a04d5d926599d72c19
    ReportDetailDto getReportDetail(Long userId, Long foodCategoryId);
    void deleteByUserId(Long id);
}
