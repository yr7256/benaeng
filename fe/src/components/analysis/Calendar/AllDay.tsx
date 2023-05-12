import React, { useState } from 'react';
import './calendar.css';
import CalendarModal from './CalendarModal';

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
}: Props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [purchaseItems, setPurchaseItems] = useState<number[]>([]);
	const [cycleItems, setCycleItems] = useState<number[]>([]);
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
		const dateStr = dateToyyyymmdd(day);
		if (purchase[dateStr]) setPurchaseItems(purchase[dateStr]);
		if (cycle[dateStr]) setCycleItems(cycle[dateStr]);
		setModalIsOpen(true);
	};
	return (
		<div onClick={() => clickDate()} className={`${dateClassName} AlldayDayContainer mx-auto`}>
			<p className={`text-center items-center ${conditionClassName}`}>{day.getDate()}</p>
			<CalendarModal
				isOpen={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
				purchaseItems={purchaseItems}
				cycleItems={cycleItems}
			/>
		</div>
	);
}

export default allDay;
