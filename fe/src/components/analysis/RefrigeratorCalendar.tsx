import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { throttle } from 'lodash';
import Calendar from './Calendar/Main';
import Alarm from '../notice/alarm/Alarm';
import FoodIcon from '../common/foodIcon/FoodIcon';
import { getCalendarData } from '../../apis/foods';
import CalendarDataQuery from './test.json';
import Category from '../../constants/category.json';

// 오늘 구매한 항목 데이터 받아야함

// const debounceCalendarData = throttle(getCalendarData, 3000);

function RefrigeratorCalendar() {
	// const CalendarDataQuery = useQuery(['/calendar'], debounceCalendarData, {
	// 	keepPreviousData: true,
	// 	select: res => {
	// 		const calendarData = {};
	// 		// 요청 실패 시 종료합니다

	// 		return calendarData;
	// 	},
	// });
	const recordSet: Set<string> = new Set();
	const cycleSet: Set<string> = new Set();

	CalendarDataQuery.calendar.forEach(item => {
		item.purchaseRecords.forEach(record => {
			recordSet.add(record);
		});

		const lastRecord = item.purchaseRecords[item.purchaseRecords.length - 1];
		const date = new Date(lastRecord);

		date.setDate(date.getDate() + item.purchaseCycle);

		const nextPurchaseDate = date.toISOString().split('T')[0];
		cycleSet.add(nextPurchaseDate);
	});

	const totalRecords: string[] = Array.from(recordSet);
	const totalCycles: string[] = Array.from(cycleSet);

	return (
		<div className="mt-6">
			<Calendar purchase={totalRecords} cycle={totalCycles} />
			<div className="flex text-sm font-bold text-green mb-3 min-w-75.5 max-w-88">슬슬 구매해야 할 항목</div>
			<Alarm name="연세우유" food="우유" type={0} day={1} foodId={1} />
			{/* // 음식명, 소분류, 알림 타입, d-day, 음식 id */}
			<div className="flex text-sm font-bold text-yellow mt-3 mb-3 min-w-75.5 max-w-88">이번달 구매한 항목</div>
			<div className="flex component px-5 py-6 flex-wrap stroke border">
				<div className="flex w-1/4">
					<div className="flex mx-auto my-2 flex-col text-xs font-bold">
						<FoodIcon food="우유" size="lg" />
						<p className="mt-2 text-left">우유</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RefrigeratorCalendar;
