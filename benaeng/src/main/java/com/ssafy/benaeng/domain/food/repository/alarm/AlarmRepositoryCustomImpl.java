package com.ssafy.benaeng.domain.food.repository.alarm;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.ssafy.benaeng.domain.food.entity.QAlarm.alarm;
import static com.ssafy.benaeng.domain.food.entity.QMyFood.*;
import static com.ssafy.benaeng.domain.user.entity.QUser.user;

@Slf4j
public class AlarmRepositoryCustomImpl implements AlarmRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public AlarmRepositoryCustomImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<AlarmDto> getAlarmList(Long userId) {
        Date date = new Date();
        LocalDate curDate = LocalDate.now();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, -7);
        date = cal.getTime();
        List<AlarmDto> alarmDtoList =
                queryFactory.select(Projections.fields(AlarmDto.class,
                        alarm.type,
                        alarm.status,
                        alarm.createDate,
                        alarm.dDay,
                        alarm.foodName,
                        myFood.id.as("foodId"),
                        myFood.foodCategory.id.as("foodCategoryId")
                        )).from(alarm)
                        .join(alarm.user, user)
                        .join(alarm.food, myFood)
                        .where(user.id.eq(userId))
                        .where(alarm.createDate.between(date, new Date()))
                        .orderBy(alarm.createDate.asc(), alarm.status.desc())
                        .fetch();
        return alarmDtoList;
    }
}
