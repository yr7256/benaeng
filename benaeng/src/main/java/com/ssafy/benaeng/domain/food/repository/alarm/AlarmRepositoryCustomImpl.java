package com.ssafy.benaeng.domain.food.repository.alarm;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;
import org.apache.http.client.utils.DateUtils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.ssafy.benaeng.domain.food.entity.QAlarm.alarm;
import static com.ssafy.benaeng.domain.food.entity.QFoodCategory.*;
import static com.ssafy.benaeng.domain.food.entity.QMyFood.*;
import static com.ssafy.benaeng.domain.user.entity.QUser.user;

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
        LocalDate ago7 = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        List<AlarmDto> alarmDtoList =
                queryFactory.select(Projections.fields(AlarmDto.class,
                        user.id.as("userId"),
                        alarm.type,
                        alarm.status,
                        alarm.createDate,
                        alarm.dDay,
                        alarm.foodName,
                        myFood.id.as("foodId"),
                        foodCategory.id.as("foodCategoryId"),
                        alarm.msg)).from(alarm)
                        .join(alarm.user, user)
                        .join(alarm.food, myFood)
                        .where(user.id.eq(userId))
                        .where(alarm.createDate.between(date, new Date()))
                        .fetch();
        return alarmDtoList;
    }
}
