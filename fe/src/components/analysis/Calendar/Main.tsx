import React, { useState } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import './calendar.css';

function Main() {
	const [nowDate, setNowDate] = useState<Date>(new Date());
	const [clickedDate, setClickedDate] = useState<Date>();

	return (
		<div className="Calendar-Container">
			<ControlDate nowDate={nowDate} setNowDate={setNowDate} />
			<DateBox nowDate={nowDate} setNowDate={setNowDate} clickedDate={clickedDate} setClickedDate={setClickedDate} />
		</div>
	);
}

export default Main;
