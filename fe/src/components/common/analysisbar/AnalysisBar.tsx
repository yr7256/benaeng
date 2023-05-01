import React from 'react';
import Medal from './Medal';

interface BarProps {
	ranking: number;
	name: string;
	value: number;
	maxvalue: number;
}

type medalType = { [key: number]: string };

function AnalysisBar({ ranking, name, value, maxvalue }: BarProps) {
	const medal: medalType = { 1: 'gold', 2: 'silver', 3: 'bronze' };
	const widthPercentage = (value / maxvalue) * 100;
	return (
		<div className="flex w-max-88 text-xs text">
			<div className="relative flex w-7 h-8 justify-end items-center mr-1.5">
				<div className="absolute left-0 top-1">
					<Medal medal={medal[ranking]} />
				</div>
				<div className="flex justify-center w-6 h-6 rounded-lg bg-skyBlue">
					{/* 이미지 받아오는거에 따라 다르게 받아야 함 */}
					<img className="block w-4 h-4 m-auto" src="/assets/food/우유.svg" alt="milk" />
				</div>
			</div>
			<div className="flex w-12 h-8 border-r-2 stroke">
				<div className="flex items-center">{name}</div>
			</div>
			<div className="relative flex w-36 h-8 flex items-center mr-1.5">
				<div
					className={`absolute h-4 bg-green ${ranking === 1 ? '' : 'opacity-50'} rounded-e-2xl`}
					style={{ width: `${widthPercentage}%` }}
				/>
			</div>
			<div className="flex h-8">
				<div className="flex items-center">
					월/<span className="font-bold">{value}회</span>
				</div>
			</div>
		</div>
	);
}

export default AnalysisBar;
