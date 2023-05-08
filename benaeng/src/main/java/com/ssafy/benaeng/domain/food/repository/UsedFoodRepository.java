package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.UsedFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsedFoodRepository extends JpaRepository<UsedFood , Long> {
    long countByFoodCategoryIdAndUserId(Long foodCategoryId, Long userId);
    List<UsedFood> findAllByFoodCategoryIdAndUserId(Long foodCategoryId , Long userId);
    List<UsedFood> findAllByUserId(Long userId);
}
