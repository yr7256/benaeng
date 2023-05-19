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
import org.springframework.transaction.annotation.Transactional;

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
    public Boolean isNew(Long userId) {
        Date startDate = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        cal.add(Calendar.DATE, -7);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        startDate = cal.getTime();

        Date endDate = new Date();
        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(endDate);
        endDate = calEnd.getTime();

        Long result =
                queryFactory.select(Projections.constructor(Long.class,
                                alarm.count()
                        )).from(alarm)
                        .join(alarm.user, user)
                        .where(user.id.eq(userId))
                        .where(alarm.status.eq(0))
                        .where(alarm.createDate.between(startDate, endDate))
                        .fetchOne();
        return result != 0;
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
                        alarm.foodCategory.id.as("foodCategoryId")
                        )).from(alarm)
                        .join(alarm.user, user)
                        .join(alarm.food, myFood)
                        .where(user.id.eq(userId))
                        .where(alarm.createDate.between(date, new Date()))
                        .orderBy(alarm.createDate.asc(), alarm.status.desc())
                        .fetch();
        return alarmDtoList;
    }
    static NumberExpression<Integer> count0 =
            Expressions.numberTemplate(Integer.class, "count(case when {0}.type = 0 then 1 else null end)", alarm);
    static NumberExpression<Integer> count1 =
            Expressions.numberTemplate(Integer.class, "count(case when {0}.type = 1 then 1 else null end)", alarm);
    static NumberExpression<Integer> count2 =
            Expressions.numberTemplate(Integer.class, "count(case when {0}.type = 2 then 1 else null end)", alarm);

    static StringExpression formattedDate = Expressions.stringTemplate("FUNCTION('DATE_FORMAT', {0}, '%Y-%m-%d')", alarm.createDate);

    @Override
    public List<FcmAlarmDto> getFcmAlarmList() {
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
    @Transactional
    @Override
    public void updateAlarm(Long userId) {
        Date startDate = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        cal.add(Calendar.DATE, -7);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        startDate = cal.getTime();
        log.info("startDate = "+ startDate);

        Date endDate = new Date();
        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(endDate);
        endDate = calEnd.getTime();
        queryFactory.update(alarm)
                .set(alarm.status, 1)
                .where(alarm.user.id.eq(userId))
                .where(alarm.createDate.between(startDate, endDate))
                .execute();
    }

    @Override
    public FcmAlarmDto getFcmAlarm(String deviceToken) {
        String date = LocalDate.now().toString();
        Tuple tuple =
                queryFactory.select(user.deviceToken, user.id, count0, count1, count2)
                        .from(alarm)
                        .join(alarm.user, user)
                        .where(formattedDate.eq(date))
                        .where(user.isAlarm.eq(true))
                        .where(user.deviceToken.eq(deviceToken))
                        .groupBy(user.id)
                        .fetchOne();
        Integer period = tuple.get(count0);
        Integer imminent = tuple.get(count1);
        Integer expiration = tuple.get(count2);
        if(deviceToken == null || period+imminent+expiration == 0) return null;

        return new FcmAlarmDto(deviceToken, imminent, expiration, period);
    }
}
