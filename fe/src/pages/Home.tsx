import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { throttle } from 'lodash';
import Accordion from '../components/common/accordion/Accordion';
import AlarmButton from '../components/home/button/AlarmButton';
import Logo from '../components/common/logo/Logo';
import AddButton from '../components/home/button/AddButton';
import AnalysisButton from '../components/home/button/AnalysisButton';
import AddModal from '../components/home/modal/AddModal';
import SettingButton from '../components/home/button/SettingButton';
import SearchBar from '../components/home/search/SearchBar';
import { getFoodList } from '../apis/foods';
import Category from '../constants/category.json';
import { CategoryData, FoodData, HomeFoodData } from '../types';
import FoodIcon from '../components/home/button/FoodIcon';
import { matchKo } from '../utils/string';

interface Refrigerator {
	[category: string]: HomeFoodData[];
}

const debounceFoodList = throttle(getFoodList, 3000);
// 메인화면
function Home() {
	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	const foodListQuery = useQuery(['foodList', search], debounceFoodList, {
		keepPreviousData: true,
		select: res => {
			const refrigerator: Refrigerator = {};
			// 요청 실패 시 종료합니다
			if (!res) return refrigerator;

			const foodList: FoodData[] = res.data.data;
			const categoryList: CategoryData[] = Category.data;

			// 표시를 위한 정렬을 시작합니다
			foodList.forEach(food => {
				// 해당 음식의 카테고리를 확인합니다
				const categoryData = categoryList.find(item => item.foodCategoryId === food.foodCategoryId);

				// 유효한 카테고리인 경우
				if (categoryData) {
					// 음식의 남은 날짜를 연산
					const dDay = moment().diff(moment(food.endDate, 'YYYY-MM-DD'), 'day');
					const homeFood: HomeFoodData = { ...food, ...categoryData, dDay };

					if (!matchKo(homeFood.subCategory, search) && !matchKo(homeFood.foodName, search)) return;

					if (categoryData?.category in refrigerator) {
						// 이미 추가된 category인 경우
						refrigerator[categoryData.category] = [...refrigerator[categoryData.category], homeFood];
					} else {
						// 새로 추가된 category인 경우
						refrigerator[categoryData.category] = [homeFood];
					}
				}
			});

			return refrigerator;
		},
	});

	const navigate = useNavigate();

	/**
	 * 추가 버튼 이벤트
	 */
	const onClickAddBtn = () => {
		navigate('/barcode');
	};

	/** 컴포넌트 컬럼 비율 반환 함수 */
	const columSize = useMemo(() => {
		const width = window.innerWidth <= 720 ? window.innerWidth : 720;
		return `grid-cols-${Math.round(width / 100)}`;
	}, []);

	return (
		<div className="px-6 pt-10 pb-40 max-w-screen-md mx-auto flex flex-col gap-4">
			{/* 헤더 */}
			<header className="flex justify-between mb-8">
				{/* 비냉 로고 */}
				<div className="flex items-center">
					<Logo type={1} />
					<h1 className="text text-2xl font-extrabold mx-2">비냉</h1>
				</div>

				{/* 알람버튼 */}
				<div>
					<SettingButton />
					<AlarmButton isAlarm={false} />
				</div>
			</header>

			{/* 소비패턴 페이지 이동 버튼 */}
			<AnalysisButton />

			{/* 냉장고 소비기한 임박 식품 목록 */}
			<section className="mt-8">
				<Accordion primary label="소비기한 임박 식품" open>
					<div className="p-8 opacity-50">진행중...</div>
				</Accordion>
			</section>

			<hr className="stroke" />
			{/* 냉장고 식품 전체 목록 */}
			{foodListQuery.data && Object.keys(foodListQuery.data).length > 0 ? (
				<section className="flex flex-col gap-4">
					<SearchBar value={search} setValue={setSearch} />
					{Object.keys(foodListQuery.data).map(categoryKey => (
						<Accordion key={categoryKey} primary={undefined} label={categoryKey} open>
							<div className={`p-6 pt-7 grid ${columSize} gap-4`}>
								{foodListQuery.data[categoryKey].map(({ foodId, subCategory, foodName, dDay }) => (
									<FoodIcon key={foodName} id={foodId} icon={subCategory} dDay={dDay} name={foodName} />
								))}
							</div>
						</Accordion>
					))}
				</section>
			) : (
				<div className="text-light/boldStroke dark:text-dark/boldStroke center flex-col gap-3 pt-[10%]">
					등록된 식품이 아직 없어요!
					<img className="dark:hidden" src="/assets/light/empty-refrigerator.svg" alt="빈 냉장고" />
					<img className="hidden dark:block" src="/assets/dark/empty-refrigerator.svg" alt="빈 냉장고" />
				</div>
			)}

			{/* 식품 추가 버튼 */}
			<AddButton onClick={onClickAddBtn} className="fixed bottom-10 left-1/2 -translate-x-10 z-10" />
			<AddModal open={openAddModal} setClose={() => setOpenAddModal(false)} />
		</div>
	);
}

export default Home;
