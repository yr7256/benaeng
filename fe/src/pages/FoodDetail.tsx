import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Accordion from '../components/common/accordion/Accordion';
import FoodInfo from '../components/foods/info/FoodInfo';
import FoodContent from '../components/foods/detail/FoodContent';
import FoodDetailAnalysis from '../components/foods/analysis/FoodDetailAnalysis';
import Topbar from '../components/common/topbar/Topbar';
import { CACHE_TIME, STALE_TIME } from '../constants/api';
import { FOOD_API, getFood } from '../apis/foods';

// 식품 상세화면

function FoodDetail() {
	const url: string[] = window.location.href.split('/');
	const { isLoading, data } = useQuery([FOOD_API], () => getFood(Number(url[url.length - 1])), {
		keepPreviousData: true,
		staleTime: STALE_TIME,
		cacheTime: CACHE_TIME,
	});
	return (
		<div>
			{!isLoading && data && (
				<div className="px-6 pt-10 page">
					<Topbar />
					<div className="mb-4">
						<FoodContent foodData={data.data.data} />
					</div>
					<div className="mb-4">
						<Accordion primary={false} label="영양정보" open={false}>
							<FoodInfo foodData={data.data.data} />
						</Accordion>
					</div>
					<div className="mb-4">
						<Accordion primary={false} label="소비패턴 분석 보고서" open={false}>
							<FoodDetailAnalysis foodData={data.data.data} />
						</Accordion>
					</div>
				</div>
			)}
		</div>
	);
}

export default FoodDetail;
