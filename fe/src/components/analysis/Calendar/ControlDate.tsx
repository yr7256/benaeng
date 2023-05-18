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
				<button
					type="button"
					className="text-green text-3xl font-extrabold ml-5"
					onClick={() => changeMonth(-1)}
				>{`<`}</button>
			</div>
			<p className="text-lg font-extrabold">{`${monthNames[nowDate.getMonth()]} ${nowDate.getFullYear()}`}</p>
			<div>
				<button
					type="button"
					className="text-green text-3xl font-extrabold mr-5"
					onClick={() => changeMonth(+1)}
				>{`>`}</button>
			</div>
		</div>
	);
}

export default ControlDate;
