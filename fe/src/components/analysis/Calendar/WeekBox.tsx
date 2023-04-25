import React from 'react';

interface Props {
	weekName: string;
}

function WeekBox({ weekName }: Props) {
	return (
		<div>
			<p>{weekName}</p>
		</div>
	);
}

export default WeekBox;
