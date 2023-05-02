package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.entity.FoodCategory;
import com.ssafy.benaeng.domain.food.entity.MyFood;
import com.ssafy.benaeng.domain.food.requestDto.ChangeCountDto;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.requestDto.StateDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodMoreInfoDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodsDto;

import java.text.ParseException;
import java.util.List;

public interface FoodService {
    MyFood saveMyFood(RegistDto registDto);
    List<FoodsDto> findMyFoodList(Long userId);
    List<FoodCategory> findAllFoodCategory();
    void changeStateMyFood(StateDto stateDto) throws ParseException;
    void changeCountMyFood(ChangeCountDto changeCountDto);
    FoodMoreInfoDto getFoodMoreInfo(Long foodId);
}
