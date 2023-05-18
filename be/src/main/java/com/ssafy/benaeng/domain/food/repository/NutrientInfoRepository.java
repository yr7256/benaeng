package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.NutrientInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NutrientInfoRepository extends JpaRepository<NutrientInfo, Long> {
    NutrientInfo findByFoodName(String foodName);
    List<NutrientInfo> findAllByFoodName(String foodName);
}
