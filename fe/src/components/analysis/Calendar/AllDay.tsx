import React from 'react';

interface ContainerProps {
	sameMonth: boolean;
	sameDay: boolean;
	clickDay: boolean;
}

interface Props {
	day: Date;
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
	clickedDate: Date | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

function allDay({ day, nowDate, setNowDate, clickedDate, setClickedDate }: Props) {
	const nowTime = new Date();

	const sameMonth = nowDate.getMonth() === day.getMonth();
	const sameDay =
		nowTime.getFullYear() === day.getFullYear() &&
		nowTime.getMonth() === day.getMonth() &&
		nowTime.getDate() === day.getDate();

	const clickDay: boolean = clickedDate
		? clickedDate.getFullYear() === day.getFullYear() &&
		  clickedDate.getMonth() === day.getMonth() &&
		  clickedDate.getDate() === day.getDate()
		: false;

	const clickDate = () => {
		setClickedDate(day);
	};

	return (
		<div onClick={() => clickDate()}>
			<p>{day.getDate()}</p>
		</div>
	);
};

export default allDay;
