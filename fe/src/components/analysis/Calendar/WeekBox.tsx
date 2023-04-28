import React from 'react';
import './calendar.css';

interface Props {
	weekName: string;
}

function WeekBox({ weekName }: Props) {
	return (
		<div className="WeekBox-Container stroke mb-4">
			<p>{weekName}</p>
		</div>
	);
}

export default WeekBox;
