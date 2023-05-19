package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.WastedFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WastedFoodRepository extends JpaRepository<WastedFood , Long> {
    long countByFoodCategoryIdAndUserId(Long foodCategoryId, Long userId);
    List<WastedFood> findAllByFoodCategoryIdAndUserId(Long foodCategoryId , Long userId);
    List<WastedFood> findAllByUserId(Long userId);
}
