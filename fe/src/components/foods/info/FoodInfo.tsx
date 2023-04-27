import { FoodData } from '../../../pages/FoodDetail';
import FoodTable from '../table/FoodTable';

interface Props {
	foodData: FoodData;
}

function FoodInfo({ foodData }: Props) {
	return (
		<div className="h-auto mx-auto my-6 w-80">
			<div className="flex justify-between w-full mb-6">
				<div className="flex items-center h-16 pl-3 pr-3 text-left rounded-lg w-38 bg-gray">
					<img className="w-10 h-10 mr-3" src="../src/assets/common/weight.svg" alt="weight" />
					<div>
						<p className="text-black text-xxs"> 1회 제공량</p>
						<p className="text-sm font-bold text-black">{foodData.weight}</p>
					</div>
				</div>
				<div className="flex items-center h-16 pl-3 pr-3 text-left rounded-lg w-38 bg-paleyellow">
					<img className="w-10 h-10 mr-3" src="../src/assets/common/calories.svg" alt="kcal" />
					<div>
						<p className="text-black text-xxs text-text"> 제공량당 칼로리</p>
						<p className="text-sm font-bold text-black">{foodData.weight}</p>
					</div>
				</div>
			</div>
			<FoodTable />
			<div className="mt-6 text-xs text-light/boldStroke dark:text-dark/boldStroke">
				1일 영양성분 기준치에 대한 비율(%)은 2,000kcal <br /> 기준이므로 개인의 필요 열량에 따라 다를 수 있습니다
			</div>
		</div>
	);
}

export default FoodInfo;
