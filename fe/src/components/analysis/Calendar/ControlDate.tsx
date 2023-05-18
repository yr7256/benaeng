import React from 'react';
import './calendar.css';
import moment from 'moment';

interface Props {
	nowDate: moment.Moment;
	setNowDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
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
		const date = moment(nowDate);
		date.add(change, 'month');
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
			<p className="text-lg font-extrabold">{`${monthNames[nowDate.month()]} ${nowDate.year()}`}</p>
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
