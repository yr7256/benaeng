package com.ssafy.benaeng.domain.food.repository.alarm;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.benaeng.domain.food.responseDto.AlarmDto;
import com.ssafy.benaeng.domain.food.responseDto.FcmAlarmDto;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.ArrayList;
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

    @Override
    public List<FcmAlarmDto> getFcmAlarmList() {
        NumberExpression<Integer> count0 =
                Expressions.numberTemplate(Integer.class, "count(case when {0}.type = 0 then 1 else null end)", alarm);
        NumberExpression<Integer> count1 =
                Expressions.numberTemplate(Integer.class, "count(case when {0}.type = 1 then 1 else null end)", alarm);
        NumberExpression<Integer> count2 =
                Expressions.numberTemplate(Integer.class, "count(case when {0}.type = 2 then 1 else null end)", alarm);

        StringExpression formattedDate = Expressions.stringTemplate("FUNCTION('DATE_FORMAT', {0}, '%Y-%m-%d')", alarm.createDate);
        String date = LocalDate.now().toString();
        List<Tuple> result =
                queryFactory.select(user.deviceToken, user.id, count0, count1, count2)
                        .from(alarm)
                        .join(alarm.user, user)
                        .where(formattedDate.eq(date))
                        .where(user.isAlarm.eq(true))
                        .groupBy(user.id)
                        .fetch();
        List<FcmAlarmDto> fcmAlamDtoList = new ArrayList<>();
        for(Tuple tuple : result){
            String deviceToken = tuple.get(user.deviceToken);
            Long userId = tuple.get(user.id);
            if (deviceToken == null) continue;
            Integer period = tuple.get(count0);
            Integer imminent = tuple.get(count1);
            Integer expiration = tuple.get(count2);
            if(period + imminent + expiration == 0) continue;
            fcmAlamDtoList.add( new FcmAlarmDto(deviceToken, imminent, expiration, period));
        }
        return fcmAlamDtoList;
    }
}
