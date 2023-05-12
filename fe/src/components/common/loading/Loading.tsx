import React from 'react';
import './Loading.css';

function Loading() {
	return (
		<div className="absolute top-0 left-0 z-50 center w-full h-full flex-col bg-light/background/50 dark:bg-dark/background/50">
			<svg className="w-20 h-20 overflow-visible">
				<circle
					pathLength={100}
					cx="50%"
					cy="50%"
					strokeLinecap="round"
					strokeWidth="10%"
					fill="none"
					r={20}
					strokeDasharray="100"
					strokeDashoffset={-600}
					className="-rotate-90 stroke-green origin-center loading w-10"
				/>
			</svg>
		</div>
	);
}

export default Loading;
