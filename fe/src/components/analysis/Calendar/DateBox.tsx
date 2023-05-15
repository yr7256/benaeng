import React from 'react';
import WeekBox from './WeekBox';
import AllDay from './AllDay';
import './calendar.css';

interface Props {
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
	clickedDate: Date | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	purchase: { [key: string]: number[] };
	cycle: { [key: string]: number[] };
}

const dateToyyyymmdd = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

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

function DateBox({ nowDate, setNowDate, clickedDate, setClickedDate, purchase, cycle }: Props) {
	const allDay: Date[] = monthList(nowDate);

	const weeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Ft', 'Sa'];

	return (
		<div className="DateBox-Container">
			{weeks.map(week => {
				return <WeekBox key={week} weekName={week} />;
			})}
			{allDay.map((day: Date) => {
				const yyyymmdd = dateToyyyymmdd(day);
				const todayIsPurchase = Object.keys(purchase).indexOf(yyyymmdd);
				const todayIsCycle = Object.keys(cycle).indexOf(yyyymmdd);
				const isPurchase = todayIsPurchase !== -1;
				const isCycle = todayIsCycle !== -1;
				return (
					<AllDay
						key={day.getTime()}
						day={day}
						nowDate={nowDate}
						setNowDate={setNowDate}
						clickedDate={clickedDate}
						setClickedDate={setClickedDate}
						isPurchase={isPurchase}
						isCycle={isCycle}
						purchase={purchase}
						cycle={cycle}
					/>
				);
			})}
		</div>
	);
}

export default DateBox;
