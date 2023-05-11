import { MonthlyReportData } from '../../../types/AnalysisTypes';
import FoodIcon from '../../common/foodIcon/FoodIcon';
import CategoryData from '../../../constants/category.json';
import './graph.css';

interface Props {
	reportData: MonthlyReportData;
}

function Graph({ reportData }: Props) {
	let maxHeight = 0;
	reportData.mostConsumer.forEach(item => {
		maxHeight = Math.max(maxHeight, item.consumer, item.waste);
	});
	reportData.mostWaste.forEach(item => {
		maxHeight = Math.max(maxHeight, item.consumer, item.waste);
	});
	return (
		<div className="container">
			{/* 소비량 그래프 */}
			<div className="w-full">
				<div className="text-xs font-bold text-center">
					<span className="text-green">소비량</span> 상위 3개 상품
				</div>
				<div className="flex items-center justify-end my-4">
					<div className="flex items-center mr-2">
						<span className="mr-1 text-xxs">소비</span>
						<div className="w-4 h-2 rounded bg-green" />
					</div>
					<div className="flex items-center">
						<span className="mr-1 text-xxs">폐기</span>
						<div className="w-4 h-2 rounded bg-light/stroke dark:bg-dark/stroke" />
					</div>
				</div>
				{/* 그래프 */}
				<div className="flex items-end justify-around w-full">
					{reportData.mostConsumer.map(item => {
						const consumerHeight = Math.floor((144 * (item.consumer / maxHeight)) / 16);
						const wasteHeight = Math.floor((144 * (item.waste / maxHeight)) / 16);
						return (
							<div key={item.foodCategoryId + 500} className="flex flex-col items-center justify-around">
								<div className="flex items-end mb-1">
									<div
										className={`w-4 rounded-t mr-1 h-${consumerHeight === 0 ? 'px' : consumerHeight * 4} bg-green`}
									/>
									<div
										className={`w-4 rounded-t h-${
											wasteHeight === 0 ? 'px' : wasteHeight * 4
										} bg-light/stroke dark:bg-dark/stroke`}
									/>
								</div>
								<div className="scale-90">
									<FoodIcon food={CategoryData.data[item.foodCategoryId - 1].subCategory} size="mid" />
									<div className="w-10 text-xs text-center truncate">
										{CategoryData.data[item.foodCategoryId - 1].subCategory}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div id="bar" className="w-[1px] mx-4 h-auto my-[-16px] bg-light/stroke dark:bg-dark/stroke" />
			{/* 폐기량 그래프 */}
			<div className="w-full">
				<div className="text-xs font-bold text-center">
					<span className="text-red">폐기량</span> 상위 3개 상품
				</div>
				<div className="flex items-center justify-end my-4">
					<div className="flex items-center mr-2">
						<span className="mr-1 text-xxs">소비</span>
						<div className="w-4 h-2 rounded bg-light/stroke dark:bg-dark/stroke" />
					</div>
					<div className="flex items-center">
						<span className="mr-1 text-xxs">폐기</span>
						<div className="w-4 h-2 rounded bg-red" />
					</div>
				</div>
				{/* 그래프 */}
				<div className="flex items-end justify-around w-full">
					{reportData.mostWaste.map(item => {
						const consumerHeight = Math.floor((144 * (item.consumer / maxHeight)) / 16);
						const wasteHeight = Math.floor((144 * (item.waste / maxHeight)) / 16);
						return (
							<div key={item.foodCategoryId + 1000} className="flex flex-col items-center justify-around">
								<div className="flex items-end mb-1">
									<div className={`w-4 rounded-t mr-1 h-${wasteHeight === 0 ? 'px' : wasteHeight * 4} bg-red`} />
									<div
										className={`w-4 rounded-t h-${
											consumerHeight === 0 ? 'px' : consumerHeight * 4
										} bg-light/stroke dark:bg-dark/stroke`}
									/>
								</div>
								<div className="scale-90">
									<FoodIcon food={CategoryData.data[item.foodCategoryId - 1].subCategory} size="mid" />
									<div className="w-10 text-xs text-center truncate">
										{CategoryData.data[item.foodCategoryId - 1].subCategory}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Graph;
