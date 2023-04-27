import React from 'react';
import AnalysisBar from '../common/analysisbar/AnalysisBar';

type EncCategoryType = {
	[key: number]: string;
};

function FoodAnalysis(): JSX.Element {
	const data = [
		{ category: 0, value: 12 },
		{ category: 1, value: 8 },
		{ category: 2, value: 6 },
	];
	const maxValue = data[0]?.value;
	const EncCategory: EncCategoryType = { 0: '유제품', 1: '채소류', 2: '육류' };
	return (
		<>
			<div>식품별 분석</div>
			{data.map((food, index) => (
				<div key={food.category} className="flex">
					<AnalysisBar ranking={index + 1} name={EncCategory[food.category]} value={food.value} maxvalue={maxValue} />
				</div>
			))}
		</>
	);
}

export default FoodAnalysis;
