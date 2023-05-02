import React, { useState } from 'react';
import { FoodData, CategoryData } from '../../types/FoodTypes';
import FoodDetailAnalysis from '../foods/analysis/FoodDetailAnalysis';
import Input from '../common/input/Input';
import SearchCategoryModal from '../home/modal/SearchCategoryModal';
import Category from '../../constants/category.json';

export interface FoodDetailData {
	category: string;
	subCategory: string;
	fname: string;
	total: number;
	count: number;
	startDate: string;
	endDate: string;
	weight: string;
	kcal: number;
	purchase: number;
	percent: number;
	msg: string[];
	cycle: number;
	preferProduct: string[];
}

interface AddFrom extends FoodData {
	/**
	 * 유통기한 사용여부
	 */
	isConsume: boolean;
	/**
	 * 소비기한 직접입력 선택여부
	 */
	isRecommend: boolean;
}

const CategoryList: CategoryData[] = Category.data;

function FoodAnalysis(): JSX.Element {
	const foodData: FoodDetailData = {
		category: '유제품',
		subCategory: '우유',
		fname: '서울우유',
		total: 15,
		count: 5,
		startDate: '2023-04-19',
		endDate: '2023-04-30',
		weight: '18.5g',
		kcal: 85,
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
	const [openSearchCategoryModal, setOpenSearchCategoryModal] = useState<boolean>(false);
	const [form, setForm] = useState<AddFrom>({
		foodId: -1,
		totalCount: '',
		foodCategoryId: -1,
		foodName: '',
		count: 0,
		startDate: '',
		endDate: '',
		isConsume: true,
		isRecommend: true,
	});
	const category = CategoryList.find(item => item.foodCategoryId === form.foodCategoryId) ?? {
		category: '',
		subCategory: '',
		foodCategoryId: -1,
	};
	const setCategory = (foodCategoryId: number) => {
		setForm({ ...form, foodCategoryId });
		setOpenSearchCategoryModal(false);
	};
	const onChangeForm = (value: string | number | boolean, target: string) => {
		if (target in form) {
			setForm({ ...form, [target]: value });
		}
	};
	return (
		<div className="stroke component min-w-75.5 max-w-88 px-8 pt-8 pb-12 mt-6">
			<div className="flex w-full gap-2" onClick={() => setOpenSearchCategoryModal(true)}>
				<Input
					icon="category"
					label="식품분류"
					type="text"
					disabled={undefined}
					value={category.category}
					setValue={value => onChangeForm(value, '')}
					className="flex-1 min-w-0"
				/>
				<Input
					icon="category"
					label="세부분류"
					type="text"
					disabled={undefined}
					value={category.subCategory}
					setValue={value => onChangeForm(value, '')}
					className="flex-1 min-w-0"
				/>
			</div>
			<div className="mt-6">
				<FoodDetailAnalysis foodData={foodData} />
			</div>
			<SearchCategoryModal
				open={openSearchCategoryModal}
				onClose={() => {
					setOpenSearchCategoryModal(false);
				}}
				onSubmit={setCategory}
			/>
		</div>
	);
}

export default FoodAnalysis;
