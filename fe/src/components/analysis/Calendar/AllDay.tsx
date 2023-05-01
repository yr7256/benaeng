import React from 'react';
import './calendar.css';

interface Props {
	day: Date;
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
	clickedDate: Date | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

function allDay({ day, nowDate, setNowDate, clickedDate, setClickedDate }: Props) {
	const sameMonth: boolean = nowDate.getMonth() === day.getMonth();
	const dateClassName = sameMonth ? '' : 'otherMonth';

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
