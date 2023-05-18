import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Calendar from './Calendar/Main';
import Alarm from '../notice/alarm/Alarm';
import FoodIcon from '../common/foodIcon/FoodIcon';
import { getCalendarData } from '../../apis/foods';
// import CalendarDataQuery from './test.json';
import Category from '../../constants/category.json';
import { CalendarData } from '../../types/AnalysisTypes';
import { getTodayStr } from '../../utils/string';

// 오늘 구매한 항목 데이터 받아야함

function RefrigeratorCalendar() {
	const CalendarDataQuery = useQuery(['/calendar'], getCalendarData, {
		keepPreviousData: true,
		select: res => res.data.data,
	});

	const today = moment(getTodayStr(), 'YYYY-MM-DD');
	const [selectedDatePurchases, setSelectedDatePurchases] = useState(today);
	const totalRecords: { [key: string]: number[] } = {};
	const totalCycles: { [key: string]: number[] } = {};

	CalendarDataQuery.data?.calData.forEach(item => {
		item.purchaseRecords.forEach(record => {
			if (!totalRecords[record]) {
				totalRecords[record] = [];
			}
			totalRecords[record].push(item.foodCategoryId);
		});

		const lastRecord = item.purchaseRecords[item.purchaseRecords.length - 1];
		const dateMoment = moment(lastRecord);
		dateMoment.add(item.purchaseCycle, 'day');
		const date = dateMoment.format('YYYY-MM-DD');

		if (!totalCycles[date]) {
			totalCycles[date] = [];
		}
		totalCycles[date].push(item.foodCategoryId);
	});
	const getSubCategory = (foodCategoryId: number) => {
		const categoryData = Category.data.find(category => category.foodCategoryId === foodCategoryId);
		return categoryData ? categoryData.subCategory : '';
	};

	const nextPurchaseDate = (item: CalendarData) => {
		const lastRecord = item.purchaseRecords[item.purchaseRecords.length - 1];
		const dateMoment = moment(lastRecord);
		dateMoment.add(item.purchaseCycle, 'day');
		const date = dateMoment.format('YYYY-MM-DD');
		return date;
	};

	const filteredPurchases = CalendarDataQuery.data?.calData.filter(data =>
		data.purchaseRecords.includes(selectedDatePurchases.format('YYYY-MM-DD')),
	);

	const filterCycle = CalendarDataQuery.data?.calData.filter(
		item => item.purchaseCycle > 0 && nextPurchaseDate(item) === selectedDatePurchases.format('YYYY-MM-DD'),
	);

	useEffect(() => {
		CalendarDataQuery.refetch();
	}, []);

	// console.log(CalendarDataQuery.data);

	return (
		<div className="mt-6">
			<Calendar purchase={totalRecords} cycle={totalCycles} setSelectedDatePurchases={setSelectedDatePurchases} />
			<div className="flex text-sm font-bold text-green mb-3 min-w-75.5 max-w-88">
				{selectedDatePurchases.format('MM-DD') === today.format('MM-DD')
					? '오늘'
					: selectedDatePurchases.format('MM-DD')}{' '}
				슬슬 구매해야 할 항목
			</div>
			{filterCycle && filterCycle.length > 0 ? (
				filterCycle.map(data => (
					<div className="mb-3">
						<Alarm name={data.foodName} food={data.foodCategoryId} type={0} day={0} foodId={0} />
					</div>
				))
			) : (
				<p>임박한 상품이 없어요.</p>
			)}
			{/* // 음식명, 소분류, 알림 타입, d-day, 음식 id */}
			<div className="flex text-sm font-bold text-yellow mt-3 mb-3 min-w-75.5 max-w-88">
				{selectedDatePurchases.format('MM-DD') === today.format('MM-DD')
					? '오늘'
					: selectedDatePurchases.format('MM-DD')}{' '}
				구매한 항목
			</div>
			<div className="flex flex-wrap px-5 py-6 border component stroke">
				{filteredPurchases && filteredPurchases.length > 0 ? (
					filteredPurchases.map(data => (
						<div className="flex w-1/4">
							<div className="flex flex-col mx-auto my-2 text-xs font-bold">
								<FoodIcon food={getSubCategory(data.foodCategoryId)} size="lg" />
								<p className="w-16 mt-2 text-center truncate">{data.foodName}</p>
							</div>
						</div>
					))
				) : (
					<p>구매한 상품이 없어요.</p>
				)}
			</div>
		</div>
	);
}

export default RefrigeratorCalendar;
