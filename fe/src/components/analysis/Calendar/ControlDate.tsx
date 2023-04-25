import React from 'react';
import './calendar.css';

interface Props {
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

function ControlDate({ nowDate, setNowDate }: Props) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const changeMonth = (change: number) => {
		const date = new Date(nowDate.getTime());
		date.setMonth(date.getMonth() + change);
		setNowDate(date);
	};
	return (
		<div className="ControlDate-Container">
			<div>
				<button type="button" onClick={() => changeMonth(-1)}>{`<`}</button>
			</div>
			<h1>{`${monthNames[nowDate.getMonth()]} ${nowDate.getFullYear()}`}</h1>
			<div>
				<button type="button" onClick={() => changeMonth(+1)}>{`>`}</button>
			</div>
		</div>
	);
}

export default ControlDate;
