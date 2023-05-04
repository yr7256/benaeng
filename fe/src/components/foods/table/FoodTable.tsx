/** 식품 영양정보 type */

import UTRIENT_INFO from '../../../constants/utrientInfo';
import { NutrientData } from '../../../pages/FoodDetail';

interface Props {
	nutrient: NutrientData;
}

function FoodTable({ nutrient }: Props) {
	return (
		<table className="w-full h-auto px-6">
			<thead className="h-9 bg-green">
				<tr className="border-b stroke bg-green">
					<th className="px-6 py-2 text-xs font-bold text-white bg-green dark:text-black">1회 제공량당 함량</th>
					<th colSpan={2} className="px-6 py-2 text-right bg-green text-xxs">
						1일 영양성분
						<br /> 기준치에 대한 비율
					</th>
				</tr>
			</thead>
			<tbody className="text-sm">
				{UTRIENT_INFO.map(item => (
					<tr key={item.ename} className="border-b component stroke">
						<td className="px-6 py-2 text-left text-text">{item.kname}</td>
						<td className="py-2 font-bold text-right text-text">{`${nutrient[item.ename]}${item.point}`}</td>
						<td className="px-6 py-2 font-bold text-right text-text">
							{item.aver !== 0 ? `${Math.floor((nutrient[item.ename] / item.aver) * 100)}%` : '-'}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default FoodTable;
