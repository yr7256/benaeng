package com.ssafy.benaeng.domain.food.repository.alarm;

import com.ssafy.benaeng.domain.food.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long>, AlarmRepositoryCustom{

    void deleteAllByUserId(Long id);
    List<Alarm> findAllByUserId(Long userId);
}
