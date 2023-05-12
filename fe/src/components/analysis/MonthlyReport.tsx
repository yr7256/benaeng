import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import QuarterTag from './monthly/QuarterTag';
// import { MonthlyReportData } from '../../types/AnalysisTypes';
import Input from '../common/input/Input';
import Graph from './monthly/Graph';
import { FOOD_API, getFoodFoodDataMonth } from '../../apis/foods';
import { useAppSelector } from '../../hooks/useStore';
import { selectUser } from '../../store/modules/user';
import { MonthlyReportData } from '../../types/AnalysisTypes';

function MonthlyReport() {
	const dummy: MonthlyReportData = {
		countPurchase: 0,
		countConsumer: 0,
		countWaste: 0,
		mostConsumer: [
			{
				foodCategoryId: 32,
				consumer: 20,
				waste: 6,
			},
			{
				foodCategoryId: 9,
				consumer: 15,
				waste: 10,
			},
			{
				foodCategoryId: 10,
				consumer: 10,
				waste: 8,
			},
		],
		mostWaste: [
			{
				foodCategoryId: 5,
				consumer: 10,
				waste: 15,
			},
			{
				foodCategoryId: 4,
				consumer: 3,
				waste: 10,
			},
			{
				foodCategoryId: 32,
				consumer: 7,
				waste: 3,
			},
		],
	};
	const thisYear = new Date().getFullYear();
	const thisMonth = new Date().getMonth() + 1;
	const [year, setYear] = useState(thisYear);
	const [month, setMonth] = useState(thisMonth);
	const query = useQuery([FOOD_API, 'foodData', 'month'], () => getFoodFoodDataMonth(year, month), {
		keepPreviousData: true,
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
			{!query.isFetching && query.data && (
				<div className="relative">
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
					{/* 테스트 */}
					{!query.data.countConsumer && !query.data.countPurchase && !query.data.countWaste && (
						<>
							<div className="absolute z-20 w-full px-4 py-10 top-20">
								<div className="mb-4 text-center text">
									이번 달 데이터가 부족해 <br /> 리포트는 존재하지 않습니다.{' '}
								</div>
								<img className="block w-40 m-auto" src={emptyReport} alt="empty" />
							</div>
							<div className="absolute z-10 w-full h-[450px] bg-white dark:bg-dark/component opacity-50 top-20" />
						</>
					)}
					{!query.data.countConsumer && !query.data.countPurchase && !query.data.countWaste && (
						<>
							<div className="mb-6 blur-sm">
								<QuarterTag reportData={dummy} />
							</div>
							<div className="p-4 border rounded-xl component stroke blur-sm">
								<Graph reportData={dummy} />
							</div>
						</>
					)}
					{Boolean(isEmpty) && (
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
