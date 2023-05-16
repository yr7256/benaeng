package com.ssafy.benaeng.domain.food.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.benaeng.domain.food.entity.FoodCategory;
import com.ssafy.benaeng.domain.food.entity.FoodData;
import com.ssafy.benaeng.domain.food.entity.MyFood;
import com.ssafy.benaeng.domain.food.requestDto.ChangeCountDto;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.requestDto.StateDto;
import com.ssafy.benaeng.domain.food.requestDto.YearMonthDto;
import com.ssafy.benaeng.domain.food.responseDto.*;
import com.ssafy.benaeng.domain.food.service.AlarmService;
import com.ssafy.benaeng.domain.food.service.AlarmServiceImpl;
import com.ssafy.benaeng.domain.food.service.FoodService;
import com.ssafy.benaeng.domain.image.service.AwsS3ServiceImpl;
import com.ssafy.benaeng.global.responseDto.CommonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/foods")
public class FoodController {
    private final FoodService foodService;
    private final AlarmService alarmService;
    @PostMapping("/regist")
    public CommonDto<Object> registMyFood(@AuthenticationPrincipal String id , @RequestBody RegistDto registDto) {
        try {
            registDto.setUserId(Long.parseLong(id));
            MyFood myFood = foodService.saveMyFood(registDto);
            foodService.savePurchase(myFood);
            return CommonDto.of("200", "음식 저장됨", null);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @GetMapping()
    public CommonDto<Object> getMyFood(@AuthenticationPrincipal String id) {
        try {
            Long userId = Long.parseLong(id);
            FoodsDto foodsDto = new FoodsDto();
            List<FoodsDto> myFoodList = foodService.findMyFoodList(userId);
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
    private final AwsS3ServiceImpl awsS3Service;
    @PostMapping("/barcode")
    public CommonDto<FoodData> uploadImage(@RequestPart MultipartFile multipartFile) throws JsonProcessingException {
        List<String> fileName = awsS3Service.uploadImage(multipartFile);
        String path = awsS3Service.getThumbnailPath(fileName.get(0));
        FoodData foodData = awsS3Service.getBarcode(path);
        if(foodData != null)return CommonDto.of("200" , "요청한 바코드의 식품정보입니다." , foodData);
        else return CommonDto.of("400" , "요청한 바코드의 식품정보가 존재하지 않습니다." , null);
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

    @GetMapping("/report")
    public CommonDto<Object> getReport(@AuthenticationPrincipal String id) {
        try {
            Long userId = Long.parseLong(id);
            ReportDto reportDto = foodService.getReportInfo(userId);
            return CommonDto.of("200", "리포트 분석 결과 입니다.", reportDto);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @GetMapping("/foodData/{codeNumber}")
    public CommonDto<Object> getFoodDate(@PathVariable String codeNumber){
        try {
            FoodDataDto foodDataDto = foodService.getFoodData(codeNumber);
            if(foodDataDto == null) return CommonDto.of("204", "등록되지 않은 바코드 입니다.", null);
            System.out.println(foodDataDto);
            return CommonDto.of("200", "바코드로 검색된 식품의 정보입니다.", foodDataDto);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @GetMapping("/foodData/month/{year}/{month}")
    public CommonDto<Object> getFoodMonthData(@AuthenticationPrincipal String id  ,@PathVariable int year , @PathVariable int month){
        try {
            YearMonthDto yearMonthDto = new YearMonthDto();
            yearMonthDto.setMonth(month);
            yearMonthDto.setYear(year);
            System.out.println(month + " " + year);
            Long userId = Long.parseLong(id);
            MonthReportDto monthReportDto = foodService.getMonthReport(yearMonthDto , userId);
            return CommonDto.of("200", "월간 리포트 입니다.", monthReportDto);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @GetMapping("/foodDataDetail/{foodCategoryId}")
    public CommonDto<Object> getReportDetail(@AuthenticationPrincipal String id  ,@PathVariable Long foodCategoryId){
        try {
            Long userId = Long.parseLong(id);
            ReportDetailDto reportDetailDto = foodService.getReportDetail(userId , foodCategoryId);
            return CommonDto.of("200", "식품.", reportDetailDto);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }
<<<<<<< HEAD


    @GetMapping("/fooddata/calendar/{year}/{month}")
    public CommonDto<Object> getCalendarDetail(@AuthenticationPrincipal String id , @PathVariable int year , @PathVariable int month) {
        try {
            System.out.println(month + " " + year);
            Long userId = Long.parseLong(id);
            CalendarDetailDto calendarDetailDto = foodService.getCalendarDetail(userId, year, month);
            return CommonDto.of("200", "월간 분석리포트 입니다.", calendarDetailDto);
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }

    @DeleteMapping("/init")
    public CommonDto<Object> deleteByUserId(@AuthenticationPrincipal String userId){
        try{
            Long id = Long.parseLong(userId);
            foodService.deleteByUserId(id);
            alarmService.deleteByUserId(id);
            return CommonDto.of("200", "냉장고 초기화 성공", userId);
        }catch (Exception e){
            return CommonDto.of("400", "냉장고 초기화 실패", e.getMessage());

        }
    }
}
