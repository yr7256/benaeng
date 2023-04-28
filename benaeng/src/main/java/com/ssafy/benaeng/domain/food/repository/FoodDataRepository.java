package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.FoodData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodDataRepository extends JpaRepository<FoodData, Long> {
}
