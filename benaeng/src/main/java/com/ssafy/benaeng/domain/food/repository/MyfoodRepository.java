package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.MyFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MyfoodRepository extends JpaRepository<MyFood, Long> {
    List<MyFood> findAllByUserId(Long userId);
    List<MyFood> findAllByFoodCategoryIdAndUserId(Long foodCategoryId , Long userId);
    void deleteByUserId(Long id);

}
