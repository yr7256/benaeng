delimiter //
create procedure `alarm_generate`()
begin
		-- 구매주기 
		insert into alarm
			(create_date, d_day, `status`, `type`, my_food_id, food_category_id, user_id, food_name)
			(
			select curdate() as create_date, 0 as d_day, 0 as `status`, 0 as `type`, 1 as food_id, food_category_id, P.user_id,
				(select M.food_name from used_food M
				where M.food_category_id = P.food_category_id and M.user_id =P.user_id
				group by M.food_name
				order by count(M.food_name) desc
				limit 1) as food_name
			from purchase P join `user` U
			on P.user_id = U.user_id
			where date_add(P.last_date, interval round(datediff(last_date, first_date) / cnt) day) = curdate()
				and P.cnt != 1 and U.is_alarm = true and U.is_purchase = true
        );
        -- 소비기한 임박
        insert into alarm
			(create_date, d_day, `status`, `type`, my_food_id, food_category_id, user_id, food_name)
			(
			select curdate() as create_date, datediff(end_date, curdate()) as d_day, 0 as `status`, 1 as `type`, 
				id as my_food_id, food_category_id, U.user_id, food_name
			from my_food P join `user` U
			on P.user_id = U.user_id
			where datediff(end_date, curdate()) between 0 and 3 and U.is_alarm = true and U.is_cycle = true 
        );
		-- 소비기한 만료
        insert into alarm
			(create_date, d_day, `status`, `type`, my_food_id, food_category_id, user_id, food_name)
			(
			select curdate() as create_date, -1 as d_day, 0 as `status`, 2 as `type`, 
				id as my_food_id, food_category_id, M.user_id, food_name
			from my_food M join `user` U
			on M.user_id = U.user_id
			where datediff(end_date, curdate()) < 0 and U.is_alarm = true and U.is_cycle = true
        );
end//

create event `alarm_event`
on schedule every 1 day
starts '2023-05-18 00:00:00'
comment 'exp date alarm create event'
do
begin
	call alarm_generate();
end//

delimiter ;