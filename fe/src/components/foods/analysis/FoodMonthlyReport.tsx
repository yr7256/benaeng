import { ReportData } from '../../../components/analysis/MonthlyReport';
import CircleGraph from '../../common/circleGraph/CircleGraph';
import FoodIcon from '../../common/foodIcon/FoodIcon';

interface Props {
	reportData: ReportData;
}

function FoodMonthlyReport({ reportData }: Props) {
	return (
		<div className="h-auto mx-auto my-6 max-w-88">
			<div className="flex items-center justify-between mb-8 text-xs">
				<div className="flex-col w-1/3 h-[109px] relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/dispose.svg" alt="purchase" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-red text-inherit whitespace-nowrap text-stroke">
						{reportData.discard}개
					</div>
					<div>월간 폐기한 식품</div>
				</div>
				<div className="flex-col w-1/3 h-[109px] relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/purchase.svg" alt="purchase" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-yellow text-inherit whitespace-nowrap text-stroke">
						{reportData.purchase}개
					</div>
					<div>월간 구매한 식품</div>
				</div>
				<div className="flex-col w-1/3 h-[109px] relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/cycle.svg" alt="cycle" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-blue whitespace-nowrap text-stroke">
						{reportData.consume}개
					</div>
					<div>월간 소비한 식품</div>
				</div>
			</div>
			<div className="flex">
				<div className="flex justify-center mb-2 w-1/2">
					<CircleGraph
						reverse
						size="mid"
						percent={Math.round((reportData.discard * 100) / reportData.purchase) / 100}
					/>
				</div>
				<div className="flex flex-col text-left ml-4 w-1/2">
					<div className="font-bold text-sm mb-2">
						식품 폐기율
						<span className="text-green"> {Math.round((reportData.discard * 100) / reportData.purchase)}%</span>
					</div>
					<div className="text-xxs mb-8">냉장고를 잘 관리하고 있어요</div>
					<div className="font-bold text-sm mb-2">자주 폐기하는 식품</div>
					<div className="flex flex-row justify-between">
						{reportData?.preferSubCategory.map(food => (
							<div key={food} className="flex flex-col">
								<FoodIcon food={food} size="mid" />
								<div className="text-xxs text-center">{food}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<hr className="stroke mt-8 mb-8" />
			<div className="flex justify-center mb-8">
				<FoodIcon food={reportData.best_category} size="lg" />
				<div className="w-40 h-16 text-left ml-4">
					<div className="font-bold text-sm mb-2">
						<span className="text-green">{reportData.best_category}</span> 러버
					</div>
					<div className="text-xs">
						모든 식품 중 <span className="text-green">{reportData.best_category}</span>을(를) 가장 많이 소비하고 있어요.
					</div>
				</div>
			</div>
		</div>
	);
}

export default FoodMonthlyReport;
