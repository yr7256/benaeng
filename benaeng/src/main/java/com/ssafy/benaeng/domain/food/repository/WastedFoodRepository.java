package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.WastedFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WastedFoodRepository extends JpaRepository<WastedFood , Long> {
    long countByFoodCategoryIdAndUserId(Long foodCategoryId, Long userId);
}
