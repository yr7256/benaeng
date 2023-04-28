import { FoodData } from '../../../pages/FoodDetail';
import CircleGraph from '../../common/circleGraph/CircleGraph';

interface Props {
	foodData: FoodData;
}

function FoodDetailAnalysis({ foodData }: Props) {
	return (
		<div className="h-auto mx-auto my-6 w-80">
			<div className="mb-4 font-bold text-left text-green">{foodData.subCategory}</div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex-col w-[88px] h-[109px] text-xs relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/purchase.svg" alt="purchase" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-yellow text-inherit whitespace-nowrap text-stroke">
						{foodData.purchase}일
					</div>
					<div>평균 구매주기</div>
				</div>
				<div className="flex-col w-[88px] h-[109px] text-xs">
					<div className="flex justify-center mb-2">
						<CircleGraph reverse size="sm" percent={foodData.percent / 100} />
					</div>
					<div>폐기율</div>
				</div>
				<div className="flex-col w-[88px] h-[109px] text-xs relative">
					<img className="block w-20 h-20 mx-auto mb-2" src="/assets/common/cycle.svg" alt="cycle" />
					<div className="absolute z-10 text-2xl font-black -translate-x-1/2 left-1/2 top-6 text-blue whitespace-nowrap text-stroke">
						{foodData.cycle}일
					</div>
					<div>평균 소비주기</div>
				</div>
			</div>
			<div className="w-full px-6 py-2 mb-12 text-xs text-left border-2 rounded-lg stroke">
				{foodData.msg.map((item, idx) => {
					if (idx !== 2) return <div className="mb-2">{item}</div>;
					return <div className="font-bold text-green">{item}</div>;
				})}
			</div>
			<div className="w-full">
				<div className="mb-4 text-sm font-bold text-left">자주 구매하는 상품</div>
				<div className="w-full h-[130px] flex flex-col justify-between">
					{foodData.preferProduct.map(item => (
						<div className="flex items-center rounded-[16px] px-6 justify-between w-full h-[34px] border-2 stroke">
							<div className="text-xs">{item}</div>
							<div className="flex items-center w-6 h-6 cursor-pointer rounded-xl bg-paleyellow">
								<img className="block w-4 h-4 m-auto" src="/assets/common/cart.svg" alt="cart" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default FoodDetailAnalysis;
