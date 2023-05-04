import React from 'react';
import Accordion from '../components/common/accordion/Accordion';
import FoodInfo from '../components/foods/info/FoodInfo';
import FoodContent from '../components/foods/detail/FoodContent';
import FoodDetailAnalysis from '../components/foods/analysis/FoodDetailAnalysis';
import Topbar from '../components/common/topbar/Topbar';

// 식품 상세화면

export interface NutrientData {
	id: number;
	totalContents: number;
	calories: number;
	carbohydrates: number;
	cholesterol: number;
	fat: number;
	protein: number;
	saturatedFattyAcids: number;
	sodium: number;
	sugars: number;
	transFat: number;
	foodName: string;
}

export interface FoodData {
	middleCategory: string;
	subCategory: string;
	foodName: string;
	total: number;
	count: number;
	startDate: string;
	endDate: string;
	nutrientInfo: NutrientData;
	purchase: number;
	percent: number;
	msg: string[];
	cycle: number;
	preferProduct: string[];
}

function FoodDetail() {
	const foodData: FoodData = {
		middleCategory: '유제품',
		subCategory: '우유',
		foodName: '서울우유',
		total: 15,
		count: 5,
		startDate: '2023-04-19',
		endDate: '2023-04-30',
		nutrientInfo: {
			id: 20010,
			totalContents: 200,
			calories: 135.0,
			carbohydrates: 0.0,
			cholesterol: 0.0,
			fat: 6.2,
			protein: 0.0,
			saturatedFattyAcids: 0.0,
			sodium: 180.0,
			sugars: 9.0,
			transFat: 0.0,
			foodName: '매일두유 순 플레인',
		},
		purchase: 20,
		percent: 34,
		msg: [
			'우유을(를) 많이 소비하고 있어요',
			'소비기한 내 우유을(를) 소비하지 못하고 있어요',
			'더 작은 크기의 우유을(를) 구매해보세요!',
		],
		cycle: 22,
		preferProduct: ['파스퇴르 저온살균 흰우유', '서울우유 1급 A우유', '연세우유 연세대학교 전용목장 우유'],
	};
	return (
		<div className="px-6 pt-10 page">
			<Topbar />
			<div className="mb-4">
				<FoodContent foodData={foodData} />
			</div>
			<div className="mb-4">
				<Accordion primary={false} label="영양정보" open={false}>
					<FoodInfo foodData={foodData} />
				</Accordion>
			</div>
			<div className="mb-4">
				<Accordion primary={false} label="소비패턴 분석 보고서" open={false}>
					<FoodDetailAnalysis foodData={foodData} />
				</Accordion>
			</div>
		</div>
	);
}

export default FoodDetail;
