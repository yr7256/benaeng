package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.entity.MyFood;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;

import java.util.List;

public interface FoodService {
    MyFood saveMyFood(RegistDto registDto);
    List<MyFood> findMyFoodList(Long userId);
}
