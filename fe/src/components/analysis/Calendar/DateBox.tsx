import React from 'react';
import moment from 'moment';
import WeekBox from './WeekBox';
import AllDay from './AllDay';
import './calendar.css';

interface Props {
	nowDate: moment.Moment;
	setNowDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
	clickedDate: moment.Moment | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<moment.Moment | undefined>>;
	purchase: { [key: string]: number[] };
	cycle: { [key: string]: number[] };
	setSelectedDatePurchases: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

const monthList = (nowDate: moment.Moment) => {
	const nowYear = nowDate.year();
	const nowMonth = nowDate.month();

	const dayOneWeek = moment(`${nowYear}-${nowMonth + 1}-1`).day();
	const dayLastWeek = moment(`${nowYear}-${nowMonth + 2}-1`)
		.subtract(1, 'days')
		.day();

	const result: moment.Moment[] = [];
	const prevMonthEnd = moment(`${nowYear}-${nowMonth + 1}-1`)
		.subtract(1, 'days')
		.date();
	const nowMonthEnd = moment(`${nowYear}-${nowMonth + 2}-1`)
		.subtract(1, 'days')
		.date();

	for (let i = dayOneWeek - 1; i >= 0; i--) {
		result.push(moment(`${nowYear}-${nowMonth}-${prevMonthEnd - i}`));
	}

	for (let i = 1; i <= nowMonthEnd; i++) {
		result.push(moment(`${nowYear}-${nowMonth + 1}-${i}`));
	}

	for (let i = 1; i < 7 - dayLastWeek; i++) {
		result.push(moment(`${nowYear}-${nowMonth + 2}-${i}`));
	}

	return result;
};

function DateBox({
	nowDate,
	setNowDate,
	clickedDate,
	setClickedDate,
	purchase,
	cycle,
	setSelectedDatePurchases,
}: Props) {
	const allDay: moment.Moment[] = monthList(nowDate);

	const weeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Ft', 'Sa'];

	return (
		<div className="DateBox-Container">
			{weeks.map(week => {
				return <WeekBox key={week} weekName={week} />;
			})}
			{allDay.map((day: moment.Moment) => {
				const yyyymmdd = day.format('YYYY-MM-DD');
				const todayIsPurchase = Object.keys(purchase).indexOf(yyyymmdd);
				const todayIsCycle = Object.keys(cycle).indexOf(yyyymmdd);
				const isPurchase = todayIsPurchase !== -1;
				const isCycle = todayIsCycle !== -1;
				return (
					<AllDay
						key={yyyymmdd}
						day={day}
						nowDate={nowDate}
						setNowDate={setNowDate}
						clickedDate={clickedDate}
						setClickedDate={setClickedDate}
						isPurchase={isPurchase}
						isCycle={isCycle}
						purchase={purchase}
						cycle={cycle}
						setSelectedDatePurchases={setSelectedDatePurchases}
					/>
				);
			})}
		</div>
	);
}

export default DateBox;
