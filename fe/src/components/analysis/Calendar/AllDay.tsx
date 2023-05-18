import React from 'react';
import './calendar.css';

interface Props {
	day: moment.Moment;
	nowDate: moment.Moment;
	setNowDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
	clickedDate: moment.Moment | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<moment.Moment | undefined>>;
	isPurchase: boolean;
	isCycle: boolean;
	purchase: { [key: string]: number[] };
	cycle: { [key: string]: number[] };
	setSelectedDatePurchases: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

function allDay({
	day,
	nowDate,
	setNowDate,
	clickedDate,
	setClickedDate,
	isPurchase,
	isCycle,
	purchase,
	cycle,
	setSelectedDatePurchases,
}: Props) {
	const sameMonth: boolean = nowDate.month() === day.month();
	const dateClassName = sameMonth ? '' : 'otherMonth';
	let conditionClassName = '';
	if (isPurchase && isCycle && sameMonth) {
		conditionClassName = 'PurchaseAndCycleDay';
	} else if (isPurchase && sameMonth) {
		conditionClassName = 'PurchaseDay';
	} else if (isCycle && sameMonth) {
		conditionClassName = 'CycleDay';
	}
	const clickDate = () => {
		setClickedDate(day);
		setSelectedDatePurchases(day);
	};
	return (
		<div onClick={() => clickDate()} className={`${dateClassName} AlldayDayContainer mx-auto`}>
			<p className={`text-center items-center ${conditionClassName}`}>{day.date()}</p>
		</div>
	);
}

export default allDay;
