import React from 'react';
import './calendar.css';

interface Props {
	day: Date;
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
	clickedDate: Date | undefined;
	setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	isPurchase: boolean;
	isCycle: boolean;
	purchase: { [key: string]: number[] };
	cycle: { [key: string]: number[] };
	modalIsOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	purchaseItems: number[];
	setPurchaseItems: React.Dispatch<React.SetStateAction<number[]>>;
	cycleItems: number[];
	setCycleItems: React.Dispatch<React.SetStateAction<number[]>>;
	setSelectedDatePurchases: React.Dispatch<React.SetStateAction<Date>>;
}

const dateToyyyymmdd = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

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
	modalIsOpen,
	setModalIsOpen,
	purchaseItems,
	setPurchaseItems,
	cycleItems,
	setCycleItems,
	setSelectedDatePurchases,
}: Props) {
	const sameMonth: boolean = nowDate.getMonth() === day.getMonth();
	const dateClassName = sameMonth ? '' : 'otherMonth';
	let conditionClassName = '';
	if (isPurchase && isCycle) {
		conditionClassName = 'PurchaseAndCycleDay';
	} else if (isPurchase) {
		conditionClassName = 'PurchaseDay';
	} else if (isCycle) {
		conditionClassName = 'CycleDay';
	}
	const clickDate = () => {
		setClickedDate(day);
		setSelectedDatePurchases(day);
		const dateStr = dateToyyyymmdd(day);
		let isPurchaseItems = false;
		let isCycleItems = false;
		if (purchase[dateStr]) {
			setPurchaseItems(purchase[dateStr]);
			isPurchaseItems = purchase[dateStr].length > 0;
		}
		if (cycle[dateStr]) {
			setCycleItems(cycle[dateStr]);
			isCycleItems = cycle[dateStr].length > 0;
		}
		if (!purchase[dateStr]) {
			setPurchaseItems([]);
			isPurchaseItems = false;
		}
		if (!cycle[dateStr]) {
			setCycleItems([]);
			isCycleItems = false;
		}
		if (isPurchaseItems || isCycleItems) {
			setModalIsOpen(true);
		}
	};
	return (
		<div onClick={() => clickDate()} className={`${dateClassName} AlldayDayContainer mx-auto`}>
			<p className={`text-center items-center ${conditionClassName}`}>{day.getDate()}</p>
		</div>
	);
}

export default allDay;
