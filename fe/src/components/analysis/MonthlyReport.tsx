import React from 'react';
import AnalysisBar from '../common/analysisbar/AnalysisBar';
import FoodMonthlyReport from '../foods/analysis/FoodMonthlyReport';

type EncCategoryType = {
	[key: number]: string;
};

export interface FavoriteCategory {
	category: number;
	value: number;
}

export interface ReportData {
	best_category: string;
	discard: number;
	purchase: number;
	consume: number;
	preferSubCategory: string[];
	favorite_category: FavoriteCategory[];
}

function MonthlyReport() {
	const reportData: ReportData = {
		best_category: '우유',
		discard: 2,
		purchase: 24,
		consume: 18,
		preferSubCategory: ['빵류', '우유', '고기'],
		favorite_category: [
			{ category: 0, value: 12 },
			{ category: 1, value: 8 },
			{ category: 2, value: 6 },
		],
	};
	const maxValue = reportData?.favorite_category[0]?.value;
	const EncCategory: EncCategoryType = { 0: '유제품', 1: '채소류', 2: '육류' };
	return (
		<div className="stroke text component max-w-88 px-6 pt-8 pb-12 mt-6">
			<FoodMonthlyReport reportData={reportData} />
			{reportData?.favorite_category.map((food, index) => (
				<div key={food.category} className="flex">
					<AnalysisBar ranking={index + 1} name={EncCategory[food.category]} value={food.value} maxvalue={maxValue} />
				</div>
			))}
		</div>
	);
}

export default MonthlyReport;
