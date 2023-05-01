import { ReportData } from '../../../components/analysis/MonthlyReport';
import CircleGraph from '../../common/circleGraph/CircleGraph';
import FoodIcon from '../../common/foodIcon/FoodIcon';

interface Props {
	reportData: ReportData;
}

function FoodMonthlyReport({ reportData }: Props) {
	return (
		<div className="h-auto mx-auto my-6 w-max-80">
			<div className="flex items-center justify-between mb-8 text-xs">
				<div className="flex-col w-[88px] h-[109px] relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/dispose.svg" alt="purchase" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-red text-inherit whitespace-nowrap text-stroke">
						{reportData.discard}일
					</div>
					<div>월간 폐기한 식품</div>
				</div>
				<div className="flex-col w-[88px] h-[109px] relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/purchase.svg" alt="purchase" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-yellow text-inherit whitespace-nowrap text-stroke">
						{reportData.purchase}일
					</div>
					<div>월간 구매한 식품</div>
				</div>
				<div className="flex-col w-[88px] h-[109px] relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/cycle.svg" alt="cycle" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-blue whitespace-nowrap text-stroke">
						{reportData.consume}일
					</div>
					<div>월간 소비한 식품</div>
				</div>
			</div>
			<div className="flex">
				<div className="flex justify-center mb-2">
					<CircleGraph
						reverse
						size="mid"
						percent={Math.round((reportData.discard * 100) / reportData.purchase) / 100}
					/>
				</div>
				<div className="flex flex-col text-left">
					<div className="font-bold text-sm mb-2">
						식품 폐기율
						<span className="text-green">{Math.round((reportData.discard * 100) / reportData.purchase)}%</span>
					</div>
					<div className="text-xs mb-8">식품을 잘 관리하고 있어요</div>
					<div className="font-bold text-sm mb-2">자주 폐기하는 식품</div>
					<div className="flex flex-row">
						{reportData?.preferSubCategory.map(food => (
							<div key={food} className="flex flex-col">
								<div className="ml-1">
									<FoodIcon food={food} size="mid" />
								</div>
								<div className="text-xs text-left">{food}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FoodMonthlyReport;
