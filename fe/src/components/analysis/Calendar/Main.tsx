import React, { useState } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import './calendar.css';

interface CalendarProps {
	purchase: { [key: string]: number[] };
	cycle: { [key: string]: number[] };
	setSelectedDatePurchases: React.Dispatch<React.SetStateAction<Date>>;
}

function Main({ purchase, cycle, setSelectedDatePurchases }: CalendarProps) {
	const [nowDate, setNowDate] = useState<Date>(new Date());
	const [clickedDate, setClickedDate] = useState<Date>();

	return (
		<div className="mb-8">
			<div className="Calendar-Container text-sm min-w-75.5 max-w-88 component stroke border">
				<ControlDate nowDate={nowDate} setNowDate={setNowDate} />
				<DateBox
					nowDate={nowDate}
					setNowDate={setNowDate}
					clickedDate={clickedDate}
					setClickedDate={setClickedDate}
					purchase={purchase}
					cycle={cycle}
					setSelectedDatePurchases={setSelectedDatePurchases}
				/>
				<div className="flex items-center justify-end mt-2 mb-5 Check-Container mr-7">
					<div className="w-4 h-4 rounded-full bg-yellow" /> <p>구매기록</p>
					<div className="w-4 h-4 rounded-full bg-green" /> <p>구매 주기일</p>
				</div>
			</div>
		</div>
	);
}

export default Main;
