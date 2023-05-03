package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    Purchase findByFoodCategoryIdAndUserId(Long foodCategoryId , Long userId);
}
