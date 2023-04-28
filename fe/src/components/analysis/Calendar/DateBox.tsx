import React from 'react';
import WeekBox from './WeekBox';
import AllDay from './AllDay';
import './calendar.css';

interface Props {
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
	clickedDate: Date | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const monthList = (nowDate: Date) => {
	const nowYear = nowDate.getFullYear();
	const nowMonth = nowDate.getMonth();

	const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay();
	const dayLastWeek = new Date(nowYear, nowMonth + 1, 0).getDay();

	const result: Date[] = [];
	const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate();
	const nowMonthEnd = new Date(nowYear, nowMonth + 1, 0).getDate();

	for (let i = dayOneWeek - 1; i >= 0; i--) {
		result.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i));
	}

	for (let i = 1; i <= nowMonthEnd; i++) {
		result.push(new Date(nowYear, nowMonth, i));
	}

	for (let i = 1; i < 7 - dayLastWeek; i++) {
		result.push(new Date(nowYear, nowMonth + 1, i));
	}

	return result;
};

function DateBox({ nowDate, setNowDate, clickedDate, setClickedDate }: Props) {
	const allDay: Date[] = monthList(nowDate);

	const weeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Ft', 'Sa'];

	return (
		<div className="DateBox-Container">
			{weeks.map(week => {
				return <WeekBox key={week} weekName={week} />;
			})}
			{allDay.map((day: Date) => {
				return (
					<AllDay
						key={day.getTime()}
						day={day}
						nowDate={nowDate}
						setNowDate={setNowDate}
						clickedDate={clickedDate}
						setClickedDate={setClickedDate}
					/>
				);
			})}
		</div>
	);
}

export default DateBox;
