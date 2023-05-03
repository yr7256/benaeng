package com.ssafy.benaeng.domain.food.controller;

import com.ssafy.benaeng.domain.food.entity.FoodCategory;
import com.ssafy.benaeng.domain.food.entity.MyFood;
import com.ssafy.benaeng.domain.food.entity.Purchase;
import com.ssafy.benaeng.domain.food.requestDto.ChangeCountDto;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.requestDto.StateDto;
import com.ssafy.benaeng.domain.food.responseDto.CommonDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodMoreInfoDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodsDto;
import com.ssafy.benaeng.domain.food.service.FoodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/foods")
public class FoodController {
    private final FoodService foodService;
    @PostMapping("/regist")
    public CommonDto<Object> registMyFood(@RequestBody RegistDto registDto) {
        try {
            MyFood myFood = foodService.saveMyFood(registDto);
            foodService.savePurchase(myFood);
            return CommonDto.of("200", "음식 저장됨", null);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @GetMapping("/{userId}")
    public CommonDto<Object> getMyFood(@PathVariable Long userId) {
        try {
            System.out.println(userId);
            FoodsDto foodsDto = new FoodsDto();
            List<FoodsDto> myFoodList = foodService.findMyFoodList(userId);
            System.out.println(Arrays.toString(myFoodList.toArray()));
            return CommonDto.of("200", "내 음식 리스트 입니다.", myFoodList);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @GetMapping("/myfood/category")
    public CommonDto<Object> getMyFood() {
        try {
            List<FoodCategory> foodCategories = foodService.findAllFoodCategory();
            return CommonDto.of("200", "모든 카테고리 리스트 입니다.", foodCategories);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @PostMapping("/state")
    public CommonDto<Object> changeFoodState(@RequestBody StateDto stateDto){
        try {
            foodService.changeStateMyFood(stateDto);
            if(stateDto.getStatus() == 0){
                return CommonDto.of("200", "등록한 식품이 폐기되었습니다.", "");
            }
            return CommonDto.of("200", "등록한 식품이 모두 소비되었습니다.", "");
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }


    }

    @PutMapping("")
    public CommonDto<Object> changeCount(@RequestBody ChangeCountDto changeCountDto){
        try {
            foodService.changeCountMyFood(changeCountDto);
            return CommonDto.of("200", "등록한 식품의 재고가 변경 되었습니다.", "");
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }

    }
    @GetMapping("/moreInfo/{foodId}")
    public CommonDto<Object> getFoodMoreInfo(@PathVariable Long foodId){
        try {
            FoodMoreInfoDto foodMoreInfoDto = foodService.getFoodMoreInfo(foodId);
            return CommonDto.of("200", "선택한 식품의 식품상세정보 입니다..", foodMoreInfoDto);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }
}
