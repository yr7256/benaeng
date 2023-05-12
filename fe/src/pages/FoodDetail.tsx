import React from 'react';
import { useQuery } from '@tanstack/react-query';
// import { HiPencilAlt } from 'react-icons/hi';
import { useParams } from 'react-router';
import Accordion from '../components/common/accordion/Accordion';
import FoodInfo from '../components/foods/info/FoodInfo';
import FoodContent from '../components/foods/detail/FoodContent';
import FoodDetailAnalysis from '../components/foods/analysis/FoodDetailAnalysis';
import Topbar from '../components/common/topbar/Topbar';
// import { CACHE_TIME, STALE_TIME } from '../constants/api';
import { FOOD_API, getFood } from '../apis/foods';

// 식품 상세화면

function FoodDetail() {
	const { id } = useParams();
	const { isFetching, data } = useQuery([FOOD_API], () => getFood(Number(id)), {
		keepPreviousData: true,
	});

	return (
		<div>
			{!isFetching && data && (
				<div className="px-6 pt-10 page">
					<div className="flex items-center justify-between">
						<Topbar />
						{/* <HiPencilAlt className="mb-10 mr-2 w-7 h-7 text-light/boldStroke dark:text-dark/boldStroke" /> */}
					</div>
					<div className="mb-4">
						<FoodContent foodData={data.data.data} />
					</div>
					<div className="mb-4">
						<Accordion primary={false} label="영양정보" open={false} className={undefined}>
							<FoodInfo foodData={data.data.data} />
						</Accordion>
					</div>
					<div className="mb-4">
						<Accordion primary={false} label="소비패턴 분석 보고서" open={false} className={undefined}>
							<FoodDetailAnalysis foodData={data.data.data} />
						</Accordion>
					</div>
				</div>
			)}
		</div>
	);
}

export default FoodDetail;
