import React, { useState } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import './calendar.css';
import CalendarModal from './CalendarModal';

interface CalendarProps {
	purchase: { [key: string]: number[] };
	cycle: { [key: string]: number[] };
	setSelectedDatePurchases: React.Dispatch<React.SetStateAction<Date>>;
}

function Main({ purchase, cycle, setSelectedDatePurchases }: CalendarProps) {
	const [nowDate, setNowDate] = useState<Date>(new Date());
	const [clickedDate, setClickedDate] = useState<Date>();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [purchaseItems, setPurchaseItems] = useState<number[]>([]);
	const [cycleItems, setCycleItems] = useState<number[]>([]);

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
					modalIsOpen={modalIsOpen}
					setModalIsOpen={setModalIsOpen}
					purchaseItems={purchaseItems}
					setPurchaseItems={setPurchaseItems}
					cycleItems={cycleItems}
					setCycleItems={setCycleItems}
					setSelectedDatePurchases={setSelectedDatePurchases}
				/>
				<div className="flex items-center justify-end Check-Container mr-7 mt-2 mb-5">
					<div className="w-4 h-4 bg-yellow rounded-full" /> <p>구매기록</p>
					<div className="w-4 h-4 bg-green rounded-full" /> <p>구매 주기일</p>
				</div>
			</div>
			<div className="mt-4">
				<CalendarModal
					isOpen={modalIsOpen}
					onClose={() => setModalIsOpen(false)}
					purchaseItems={purchaseItems}
					cycleItems={cycleItems}
				/>
			</div>
		</div>
	);
}

export default Main;
