package com.ssafy.benaeng.domain.food.controller;

import com.ssafy.benaeng.domain.food.entity.MyFood;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.responseDto.CommonDto;
import com.ssafy.benaeng.domain.food.service.FoodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/food")
public class FoodController {
    private final FoodService foodService;
    @PostMapping("/regist")
    public CommonDto<Object> registMyFood(@RequestBody RegistDto registDto) {
        try {
            MyFood myFood = foodService.saveMyFood(registDto);
            return CommonDto.of("200", "음식 저장됨", null);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @GetMapping("/myfood/{userId}")
    public CommonDto<Object> getMyFood(@PathVariable Long userId) {
        try {
            System.out.println(userId);
            List<MyFood> myFoodList = foodService.findMyFoodList(userId);
            System.out.println(Arrays.toString(myFoodList.toArray()));
            return CommonDto.of("200", "내 음식 리스트 입니다.", myFoodList);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }
}
