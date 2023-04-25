import React from 'react';
import './calendar.css'

interface Props {
	day: Date;
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
	clickedDate: Date | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

function allDay({ day, nowDate, setNowDate, clickedDate, setClickedDate }: Props) {
	// const nowTime = new Date();
	const sameMonth: boolean = nowDate.getMonth() === day.getMonth();
	const dateClassName = sameMonth ? '' : 'otherMonth';
	// const sameDay: boolean =
	// 	nowTime.getFullYear() === day.getFullYear() &&
	// 	nowTime.getMonth() === day.getMonth() &&
	// 	nowTime.getDate() === day.getDate();

	// const clickDay: boolean = clickedDate
	// 	? clickedDate.getFullYear() === day.getFullYear() &&
	// 	  clickedDate.getMonth() === day.getMonth() &&
	// 	  clickedDate.getDate() === day.getDate()
	// 	: false;

	const clickDate = () => {
		setClickedDate(day);
	};
	return (
		<div onClick={() => clickDate()} className={dateClassName}>
			<p>{day.getDate()}</p>
		</div>
	);
}

export default allDay;
