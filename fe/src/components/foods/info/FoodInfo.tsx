import { FoodData } from '../../../pages/FoodDetail';
import FoodTable from '../table/FoodTable';
import './foodInfo.css';

interface Props {
	foodData: FoodData;
}

function FoodInfo({ foodData }: Props) {
	return (
		<div className="w-full h-auto mx-auto my-6">
			<div id="info" className="flex justify-between w-full px-4 mb-6">
				<div className="flex items-center w-full h-16 pl-3 pr-3 mx-1 text-left rounded-lg bg-gray">
					<img className="mr-3 max-w-10 max-h-10" src="/assets/common/weight.svg" alt="weight" />
					<div>
						<p className="text-black text-xxs"> 1회 제공량</p>
						<p className="text-sm font-bold text-black">{foodData.nutrientInfo.totalContents}(g/ml)</p>
					</div>
				</div>
				<div className="flex items-center w-full h-16 pl-3 pr-3 mx-1 text-left rounded-lg bg-paleyellow">
					<img className="mr-3 max-w-10 max-h-10" src="/assets/common/calories.svg" alt="kcal" />
					<div>
						<p className="text-black text-xxs text-text"> 제공량당 칼로리</p>
						<p className="text-sm font-bold text-black">{foodData.nutrientInfo.calories}kcal</p>
					</div>
				</div>
			</div>
			<div className="w-full px-4">
				<FoodTable nutrient={foodData.nutrientInfo} />
			</div>
			<div className="px-4 mt-6 text-xs text-light/boldStroke dark:text-dark/boldStroke">
				1일 영양성분 기준치에 대한 비율(%)은 2,000kcal <br /> 기준이므로 개인의 필요 열량에 따라 다를 수 있습니다
			</div>
		</div>
	);
}

export default FoodInfo;
