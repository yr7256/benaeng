package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.entity.*;
import com.ssafy.benaeng.domain.food.repository.*;
import com.ssafy.benaeng.domain.food.requestDto.ChangeCountDto;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.food.requestDto.StateDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodMoreInfoDto;
import com.ssafy.benaeng.domain.food.responseDto.FoodsDto;
import com.ssafy.benaeng.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodServiceImpl implements FoodService{
    private final FoodCategoryRepository foodCategoryRepository;
    private final NutrientInfoRepository nutrientInfoRepository;
    private final FoodDataRepository foodDataRepository;
    private final UserRepository userRepository;
    private final MyfoodRepository myfoodRepository;
    private final UsedFoodRepository usedFoodRepository;
    private final WastedFoodRepository wastedFoodRepository;
    @Override
    public MyFood saveMyFood(RegistDto registDto) {
        MyFood myFood = new MyFood();
        myFood.setFoodName(registDto.getFoodName());
        myFood.setFoodCategory(foodCategoryRepository.findById(registDto.getFoodCategoryId()).orElseThrow());
        myFood.setTotalCount(registDto.getTotalCount());
        myFood.setUser(userRepository.findById(registDto.getUserId()).orElseThrow());
        if(registDto.getIsRecommend()){
            log.info("소비기한 계산로직이 들어갈예정입니다.");
            return null;
        }
        else{
            if(!registDto.getIsConsume()) {
                log.info("유통기한 기반 계산로직이 들어갈예정입니다.");
                return null;
            }
            else{
                log.info("소비기한을 입력했으므로 바로 저장합니다.");
                myFood.setStartDate(registDto.getStartDate());
                myFood.setEndDate(registDto.getEndDate());
            }
        }
        log.info("음식 {} (이)가 {}의 냉장고에 저장됩니다.",myFood.getFoodName() , myFood.getUser().getName());
        myfoodRepository.save(myFood);
        return myFood;
    }

    @Override
    public List<FoodsDto> findMyFoodList(Long userId) {

        List<MyFood> myFoodList = myfoodRepository.findAllByUserId(userId);
        List<FoodsDto> foodsDtoList = new ArrayList<>();
        for(MyFood mf : myFoodList){
            FoodsDto foodsDto = new FoodsDto();
            foodsDto.setFoodId(mf.getId());
            foodsDto.setFoodCategoryId(mf.getFoodCategory().getId());
            foodsDto.setStartDate(mf.getStartDate());
            foodsDto.setEndDate(mf.getEndDate());
            foodsDto.setTotalCount(mf.getTotalCount());
            foodsDto.setCount(mf.getCount());
            foodsDto.setFoodName(mf.getFoodName());
            foodsDtoList.add(foodsDto);
        }
        return foodsDtoList;
    }

    @Override
    public List<FoodCategory> findAllFoodCategory() {
        return foodCategoryRepository.findAll();
    }

    @Override
    public void changeStateMyFood(StateDto stateDto) throws ParseException {
        MyFood myFood = myfoodRepository.findById(stateDto.getMyFoodId()).orElseThrow();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        Date currentTime = new Date();
        String formattedTime = dateFormat.format(currentTime);
        if(stateDto.getStatus() == 1) {
            UsedFood usedFood = new UsedFood();
            usedFood.setFoodName(myFood.getFoodName());
            usedFood.setUser(myFood.getUser());
            usedFood.setFoodCategory(myFood.getFoodCategory());
            usedFood.setStartDate(myFood.getStartDate());
            usedFood.setEndDate(dateFormat.parse(formattedTime));
            usedFood.setId(myFood.getId());
            usedFoodRepository.save(usedFood);
        }
        else if(stateDto.getStatus() == 0) {
            WastedFood wastedFood = new WastedFood();
            wastedFood.setFoodName(myFood.getFoodName());
            wastedFood.setUser(myFood.getUser());
            wastedFood.setFoodCategory(myFood.getFoodCategory());
            wastedFood.setStartDate(myFood.getStartDate());
            wastedFood.setEndDate(dateFormat.parse(formattedTime));
            wastedFood.setId(myFood.getId());
            wastedFoodRepository.save(wastedFood);
        }
        myFood.setUser(null);
        myfoodRepository.save(myFood);
        myfoodRepository.deleteById(stateDto.getMyFoodId());
    }

    @Override
    public void changeCountMyFood(ChangeCountDto changeCountDto) {
        MyFood myFood = myfoodRepository.findById(changeCountDto.getMyFoodId()).orElseThrow();
        myFood.setCount(changeCountDto.getCount());
        myfoodRepository.save(myFood);
    }

    @Override
    public FoodMoreInfoDto getFoodMoreInfo(Long foodId) {
        FoodMoreInfoDto foodMoreInfoDto = new FoodMoreInfoDto();
        MyFood myFood = myfoodRepository.findById(foodId).orElseThrow();
        NutrientInfo nutrientInfo = nutrientInfoRepository.findByFoodName(myFood.getFoodName());
        Long cateId = myFood.getFoodCategory().getId();
        Long userId = myFood.getUser().getId();
        Long usedCount = usedFoodRepository.countByFoodCategoryIdAndUserId(cateId , userId);
        Long wastedCount = wastedFoodRepository.countByFoodCategoryIdAndUserId(cateId ,userId);

        foodMoreInfoDto.setFoodId(foodId);
        foodMoreInfoDto.setFoodName(myFood.getFoodName());
        foodMoreInfoDto.setCount(myFood.getCount());
        if(nutrientInfo != null){
            foodMoreInfoDto.setNutrientInfo(nutrientInfo);
        }
        foodMoreInfoDto.setStartDate(myFood.getStartDate());
        foodMoreInfoDto.setEndDate(myFood.getEndDate());
        if(usedCount == 1) foodMoreInfoDto.setPurchase(-1);
        else foodMoreInfoDto.setPurchase("계산된값");

        return null;
    }
}
