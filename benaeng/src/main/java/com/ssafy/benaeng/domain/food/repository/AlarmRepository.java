package com.ssafy.benaeng.domain.food.repository;

import com.ssafy.benaeng.domain.food.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long>{
}
