import React from 'react';
import Calendar from './Calendar/Main';
import Alarm from '../notice/alarm/Alarm';
import FoodIcon from '../common/foodIcon/FoodIcon';

// 오늘 구매한 항목 데이터 받아야함

function RefrigeratorCalendar() {
	return (
		<div className="mt-6">
			<Calendar />
			<div className="flex text-xs font-bold text-green mb-3">슬슬 구매해야 할 항목</div>
			<Alarm food="우유" type={0} day={1} id={1} />
			<div className="flex text-xs font-bold text-yellow mt-3 mb-3">오늘 구매한 항목</div>
			<div className="flex component max-w-88 px-5 py-6 flex-wrap stroke border-2">
				<div className="flex-col p-2 text-xxs font-bold">
					<FoodIcon food="우유" size="lg" />
					<p className="mt-2 text-left">우유</p>
				</div>
				<div className="flex-col p-2 text-xxs font-bold">
					<FoodIcon food="우유" size="lg" />
					<p className="mt-2 text-left">우유</p>
				</div>
				<div className="flex-col p-2 text-xxs font-bold">
					<FoodIcon food="우유" size="lg" />
					<p className="mt-2 text-left">우유</p>
				</div>
				<div className="flex-col p-2 text-xxs font-bold">
					<FoodIcon food="우유" size="lg" />
					<p className="mt-2 text-left">우유</p>
				</div>
				<div className="flex-col p-2 text-xxs font-bold">
					<FoodIcon food="우유" size="lg" />
					<p className="mt-2 text-left">우유</p>
				</div>
			</div>
		</div>
	);
}

export default RefrigeratorCalendar;
