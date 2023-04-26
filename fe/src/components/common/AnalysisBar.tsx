import React from 'react';
// import FoodIcon from './FoodIcon';
import Medal from './Medal';

interface BarProps {
	ranking: number;
	name: string;
	value: number;
	maxvalue: number;
}

type medalType = { [key: number]: string };

function AnalysisBar({ ranking, name, value, maxvalue }: BarProps) {
	const medal: medalType = { 1: 'gold', 2: 'sliver', 3: 'bronze' };
	const widthPercentage = (value / maxvalue) * 100;
	return (
		<div className="flex text-xs text">
			<div className="relative flex w-7 h-8 justify-end items-center mr-1.5">
				<div className="absolute top-1 left-0">
					<Medal medal={medal[ranking]} />
				</div>
				<div className="w-6 h-6 bg-skyBlue rounded-lg flex justify-center">
					{/* 이미지 받아오는거에 따라 다르게 받아야 함 */}
					<img className="w-4 h-4 block m-auto" src="../src/assets/food/milk.svg" alt="milk" />
				</div>
			</div>
			<div className="border-r-2 stroke w-12 h-8 flex">
				<div className="flex items-center">{name}</div>
			</div>
			<div className="relative w-52 h-8 flex items-center mr-1.5">
				<div
					className={`absolute h-4 bg-green ${ranking === 1 ? '' : 'opacity-50'} rounded-e-2xl`}
					style={{ width: `${widthPercentage}%` }}
				/>
			</div>
			<div className="h-8 flex">
				<div className="flex items-center">
					월/<span className="font-bold">{value}회</span>
				</div>
			</div>
		</div>
	);
}

export default AnalysisBar;
