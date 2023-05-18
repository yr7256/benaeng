import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CategoryData, FoodData, FoodReportData } from '../../types/FoodTypes';
import FoodDetailAnalysis from '../foods/analysis/FoodDetailAnalysis';
import Input from '../common/input/Input';
import SearchCategoryModal from '../home/modal/SearchCategoryModal';
import Category from '../../constants/category.json';
import { FOOD_API, getFoodFoodDataDetail } from '../../apis/foods';

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
	const dummy: FoodReportData = {
		subCategory: '더미',
		purchase: 20,
		percent: 34,
		msg: [
			'우유을(를) 많이 소비하고 있어요',
			'소비기한 내 우유을(를) 소비하지 못하고 있어요',
			'더 작은 크기의 우유을(를) 구매해보세요!',
		],
		cycle: 22,
		preferProducts: ['파스퇴르 저온살균 흰우유', '서울우유 1급 A우유', '연세우유 연세대학교 전용목장 우유'],
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

	/** 상품 상세정보 조회 쿼리 */
	const query = useQuery([FOOD_API, form.foodCategoryId], () => getFoodFoodDataDetail(form.foodCategoryId), {
		keepPreviousData: true,
		enabled: form.foodCategoryId > 0,
		select: res => res.data.data,
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
		<div className="stroke component min-w-75.5 max-w-88 p-4 mt-6">
			<div className="flex w-full gap-2 mt-2" onClick={() => setOpenSearchCategoryModal(true)}>
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
			{!query.isFetching && query.data && (
				<div className="mt-6">
					<FoodDetailAnalysis foodData={query.data} />
				</div>
			)}
			{!query.isFetching && !query.data && form.foodCategoryId > 0 && (
				<div className="mt-6">
					<FoodDetailAnalysis foodData={dummy} />
				</div>
			)}
			{!query.isFetching && !query.data && form.foodCategoryId < 0 && (
				<div className="mt-6">
					<FoodDetailAnalysis foodData={{ ...dummy, subCategory: '기본' }} />
				</div>
			)}
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
