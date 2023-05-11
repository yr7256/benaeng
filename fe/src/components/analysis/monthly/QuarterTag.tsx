import React from 'react';
import { MonthlyReportData } from '../../../types/AnalysisTypes';

interface Props {
	reportData: MonthlyReportData;
}

function QuarterTag({ reportData }: Props) {
	return (
		<>
			<div className="flex w-full mb-2">
				<div className="flex items-center justify-between w-full px-4 py-4 mr-1 border rounded-xl component stroke">
					<div>
						<div className="text-xs">월간 구매</div>
						<div className="text-base font-bold">{reportData.countPurchase}개</div>
					</div>
					<img className="w-10 h-10" src="/assets/common/grocery-cart.svg" alt="purchase" />
				</div>
				<div className="flex items-center justify-between w-full px-4 py-2 ml-1 border rounded-xl component stroke">
					<div>
						<div className="text-xs">월간 소비</div>
						<div className="text-base font-bold">{reportData.countConsumer}개</div>
					</div>
					<img className="w-10 h-10" src="/assets/common/cooking.svg" alt="consumer" />
				</div>
			</div>
			<div className="flex w-full">
				<div className="flex items-center justify-between w-full px-4 py-4 mr-1 border rounded-xl component stroke">
					<div>
						<div className="text-xs">월간 폐기</div>
						<div className="text-base font-bold">{reportData.countWaste}개</div>
					</div>
					<img className="w-10 h-10" src="/assets/common/food-waste.svg" alt="waste" />
				</div>
				<div className="flex items-center justify-between w-full px-4 py-2 ml-1 border rounded-xl component stroke">
					<div>
						<div className="text-xs">월간 폐기율</div>
						<div className="text-base font-bold">
							{Math.floor((reportData.countWaste / (reportData.countConsumer + reportData.countWaste)) * 100)}%
						</div>
					</div>
					<img className="w-10 h-10" src="/assets/common/data-management.svg" alt="percent" />
				</div>
			</div>
		</>
	);
}

export default QuarterTag;
