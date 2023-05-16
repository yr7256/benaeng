import moment from 'moment';
import React, { useMemo } from 'react';
import { CategoryData, FoodData, HomeFoodData, Refrigerator } from '../../../types';
import { getTodayStr, matchKo } from '../../../utils/string';
import Accordion from '../../common/accordion/Accordion';
import FoodIcon from '../button/FoodIcon';
import Category from '../../../constants/category.json';
import Loading from '../../common/loading/Loading';

interface Props {
	data: FoodData[] | undefined;
	isFetching: boolean;
	search: string;
}

function FoodList({ data, isFetching, search }: Props) {
	/** 컴포넌트 컬럼 비율 반환 함수 */
	const columSize = useMemo(() => {
		const width = window.innerWidth <= 720 ? window.innerWidth : 720;
		return `grid-cols-${Math.round(width / 100)}`;
	}, []);

	const refrigerator = useMemo(() => {
		const result: Refrigerator = {};
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
				const homeFood: HomeFoodData = { ...food, ...categoryData, dDay };

				if (!matchKo(homeFood.subCategory, search) && !matchKo(homeFood.foodName, search)) return;

				if (categoryData?.category in result) {
					// 이미 추가된 category인 경우
					result[categoryData.category] = [...result[categoryData.category], homeFood];
				} else {
					// 새로 추가된 category인 경우
					result[categoryData.category] = [homeFood];
				}
			}
		});

		return result;
	}, [data, search]);

	if (isFetching) return <Loading />;
	if (!data || Object.keys(data).length === 0)
		return (
			<div className="text-light/boldStroke dark:text-dark/boldStroke center flex-col gap-3 pt-[10%]">
				등록된 식품이 아직 없어요!
				<img className="dark:hidden" src="/assets/light/empty-refrigerator.svg" alt="빈 냉장고" />
				<img className="hidden dark:block" src="/assets/dark/empty-refrigerator.svg" alt="빈 냉장고" />
			</div>
		);
	return (
		<>
			{Object.keys(refrigerator).map(categoryKey => (
				<Accordion key={categoryKey} primary={undefined} label={categoryKey} open className={undefined}>
					<div className={`p-6 pt-7 grid ${columSize} gap-4`}>
						{refrigerator[categoryKey].map(({ foodId, subCategory, foodName, dDay }) => (
							<FoodIcon key={`${foodName}-${foodId}`} id={foodId} icon={subCategory} dDay={dDay} name={foodName} />
						))}
					</div>
				</Accordion>
			))}
		</>
	);
}

export default FoodList;
