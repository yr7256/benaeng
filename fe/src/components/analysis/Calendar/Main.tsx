import React, { useState } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import './calendar.css';

function Main() {
	const [nowDate, setNowDate] = useState<Date>(new Date());
	const [clickedDate, setClickedDate] = useState<Date>();

	return (
		<div className="Calendar-Container text-sm min-w-75.5 max-w-88 mb-8 component">
			<ControlDate nowDate={nowDate} setNowDate={setNowDate} />
			<DateBox nowDate={nowDate} setNowDate={setNowDate} clickedDate={clickedDate} setClickedDate={setClickedDate} />
			<div className="flex items-center justify-end Check-Container mr-7 mt-2 mb-5">
				<div className="w-4 h-4 bg-yellow rounded-full" /> <p>구매기록</p>
				<div className="w-4 h-4 bg-green rounded-full" /> <p>예상 구매일</p>
			</div>
		</div>
	);
}

export default Main;
