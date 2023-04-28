package com.ssafy.benaeng.domain.food.service;

import com.ssafy.benaeng.domain.food.entity.MyFood;
import com.ssafy.benaeng.domain.food.repository.FoodCategoryRepository;
import com.ssafy.benaeng.domain.food.repository.FoodDataRepository;
import com.ssafy.benaeng.domain.food.repository.MyfoodRepository;
import com.ssafy.benaeng.domain.food.requestDto.RegistDto;
import com.ssafy.benaeng.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodServiceImpl implements FoodService{
    private final FoodCategoryRepository foodCategoryRepository;
    private final FoodDataRepository foodDataRepository;
    private final UserRepository userRepository;
    private final MyfoodRepository myfoodRepository;
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
    public List<MyFood> findMyFoodList(Long userId) {
        return myfoodRepository.findAllByUserId(userId);
    }
}
