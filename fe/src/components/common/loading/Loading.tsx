import React from 'react';

function Loading() {
	return (
		<div className="center h-full">
			<svg className="absolute w-1/2">
				<circle
					pathLength={100}
					cx="50%"
					cy="50%"
					strokeLinecap="round"
					strokeWidth="10%"
					r="37.5%"
					fill="none"
					strokeDasharray="100"
					strokeDashoffset={0}
					className="-rotate-90 stroke-green origin-center grow"
				/>
			</svg>
			LOADING…
		</div>
	);
}

export default Loading;
