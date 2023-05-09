import React, { useState } from 'react';
import QuarterTag from './monthly/QuarterTag';
import { MonthlyReportData } from '../../types/AnalysisTypes';
import Input from '../common/input/Input';

function MonthlyReport() {
	const thisYear = new Date().getFullYear();
	const thisMonth = new Date().getMonth() - 1;
	const [year, setYear] = useState(thisYear);
	const [month, setMonth] = useState(thisMonth);
	const reportData: MonthlyReportData = {
		countPurchase: 24,
		countConsumer: 18,
		countWaste: 10,
		mostConsumer: [
			{
				foodCategoryId: 1,
				Consumer: 20,
				Waste: 2,
			},
			{
				foodCategoryId: 10,
				Consumer: 13,
				Waste: 5,
			},
			{
				foodCategoryId: 6,
				Consumer: 10,
				Waste: 3,
			},
		],
		mostWaste: [
			{
				foodCategoryId: 21,
				Consumer: 7,
				Waste: 7,
			},
			{
				foodCategoryId: 13,
				Consumer: 5,
				Waste: 15,
			},
			{
				foodCategoryId: 28,
				Consumer: 9,
				Waste: 20,
			},
		],
	};

	return (
		<div>
			<div className="flex items-center justify-between my-6">
				<div className="text-xl font-bold">
					<span className="text-green">
						{' '}
						{year}년 {month}월
					</span>{' '}
					<span>리포트</span>
				</div>
				<Input
					icon="calendar"
					label="선택날짜"
					type="month"
					disabled={undefined}
					value={`${year}-${month}`}
					className=""
					setValue={(value: string) => {
						const date: string[] = value.split('-');
						setYear(Number(date[0]));
						setMonth(Number(date[1]));
					}}
				/>
			</div>
			<div>
				<QuarterTag reportData={reportData} />
			</div>
		</div>
	);
}

export default MonthlyReport;
