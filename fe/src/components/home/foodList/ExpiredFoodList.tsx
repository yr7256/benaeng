import moment from 'moment';
import React, { useMemo } from 'react';
import { CategoryData, FoodData, HomeFoodData } from '../../../types';
import Accordion from '../../common/accordion/Accordion';
import Category from '../../../constants/category.json';
import FoodIcon from '../button/FoodIcon';
import './ExpiredFoodList.css';
import { getTodayStr } from '../../../utils/string';

interface Props {
	data: FoodData[] | undefined;
}

function ExpiredFoodList({ data }: Props) {
	/** 컴포넌트 컬럼 비율 반환 함수 */
	const columSize = useMemo(() => {
		const width = window.innerWidth <= 720 ? window.innerWidth : 720;
		return `grid-cols-${Math.round(width / 100)}`;
	}, []);

	const refrigerator = useMemo(() => {
		const result: HomeFoodData[] = [];
		// 요청 실패 시 종료합니다
		if (!data) return result;

		const foodDataList: FoodData[] = data;
		const categoryList: CategoryData[] = Category.data;

		// 표시를 위한 정렬을 시작합니다
		foodDataList.forEach(food => {
			// 해당 음식의 카테고리를 확인합니다
			const categoryData = categoryList.find(item => item.foodCategoryId === food.foodCategoryId);

			// 유효한 카테고리인 경우
			if (categoryData) {
				// 음식의 남은 날짜를 연산
				const today = moment(getTodayStr(), 'YYYY-MM-DD');
				const dDay = moment(food.endDate, 'YYYY-MM-DD').diff(today, 'days');
				if (dDay > 0) return;
				const homeFood: HomeFoodData = { ...food, ...categoryData, dDay };

				result.push(homeFood);
			}
		});

		return result;
	}, [data]);

	if (!data || refrigerator.length === 0) return null;

	return (
		<Accordion primary label="소비기한 마감 식품" open className="expired">
			<div className={`p-6 pt-7 grid ${columSize} gap-4`}>
				{refrigerator.map(({ foodId, subCategory, foodName, dDay }) => (
					<FoodIcon key={`${foodName}-${foodId}`} id={foodId} icon={subCategory} dDay={dDay} name={foodName} />
				))}
			</div>
		</Accordion>
	);
}

export default ExpiredFoodList;
