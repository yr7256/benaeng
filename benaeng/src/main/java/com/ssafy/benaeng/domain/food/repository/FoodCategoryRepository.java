package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodCategoryRepository extends JpaRepository<FoodCategory , Long> {
}
