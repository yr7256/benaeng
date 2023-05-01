package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.UsedFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsedFoodRepository extends JpaRepository<UsedFood , Long> {
    long countByFoodCategoryIdAndUserId(Long foodCategoryId, Long userId);
}
