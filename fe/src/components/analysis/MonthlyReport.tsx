import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import QuarterTag from './monthly/QuarterTag';
// import { MonthlyReportData } from '../../types/AnalysisTypes';
import Input from '../common/input/Input';
import Graph from './monthly/Graph';
import { FOOD_API, getFoodFoodDataMonth } from '../../apis/foods';
import { CACHE_TIME, STALE_TIME } from '../../constants/api';
import { useAppSelector } from '../../hooks/useStore';
import { selectUser } from '../../store/modules/user';

function MonthlyReport() {
	const thisYear = new Date().getFullYear();
	const thisMonth = new Date().getMonth() + 1;
	const [year, setYear] = useState(thisYear);
	const [month, setMonth] = useState(thisMonth);
	const query = useQuery([FOOD_API, 'foodData', 'month'], () => getFoodFoodDataMonth(year, month), {
		keepPreviousData: true,
		staleTime: STALE_TIME,
		cacheTime: CACHE_TIME,
		select: res => res.data.data,
	});
	useEffect(() => {
		query.refetch();
	}, [year, month]);
	const user = useAppSelector(selectUser);
	const emptyReport = `/assets/${user.isDark ? 'dark' : 'light'}/empty-analysis.svg`;

	const isEmpty = query.data?.countConsumer || query.data?.countPurchase || query.data?.countWaste;

	return (
		<div>
			{!query.isLoading && query.data && (
				<div>
					<div className="flex items-center justify-between my-6">
						<div className="text-lg font-bold">
							<span className="text-green">
								{year}년 {month}월
							</span>
							<span>리포트</span>
						</div>
						<Input
							icon="calendar"
							label="선택날짜"
							type="month"
							disabled={undefined}
							value={`${year}-${month < 10 ? `0${month}` : month}`}
							className="bg-light/component dark:bg-dark/component"
							setValue={(value: string) => {
								const date: string[] = value.split('-');
								setYear(Number(date[0]));
								setMonth(Number(date[1]));
							}}
						/>
					</div>
					{!query.data.countConsumer && !query.data.countPurchase && !query.data.countWaste && (
						<div className="w-full px-4 py-10 border component stroke">
							<div className="mb-4 text-center">
								이번 달 데이터가 부족해 <br /> 리포트는 존재하지 않습니다.{' '}
							</div>
							<img className="block m-auto" src={emptyReport} alt="empty" />
						</div>
					)}
					{isEmpty && (
						<>
							<div className="mb-6">
								<QuarterTag reportData={query.data} />
							</div>
							<div className="p-4 border rounded-xl component stroke">
								<Graph reportData={query.data} />
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default MonthlyReport;
