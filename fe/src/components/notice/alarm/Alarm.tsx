import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import FoodIcon from '../../common/foodIcon/FoodIcon';
import Category from '../../../constants/category.json';

/** alarm props 타입 */
interface Props {
	name: string;
	food: number;
	type: number;
	day: number;
	foodId: number;
}

function Alarm({ name, food, type, day, foodId }: Props) {
	// 음식명, 소분류, 알림 타입, d-day, 음식 id
	const msg = day === 0 ? '오늘까지예요' : `${day}일 남았어요`;
	return (
		<div className="flex items-center w-full h-24 px-4 border rounded-lg text component stroke">
			<div>
				<FoodIcon food={Category.data[food - 1].category} size="lg" />
			</div>
			{/* 구매주기 알림 */}
			{type === 0 && (
				<div className="ml-4">
					<div className="w-full mb-1 text-sm font-bold text-left">
						슬슬 <span className="text-green">{food}</span>을(를) 구매해야 할 시기에요
					</div>
					<a
						className="flex items-center text-xs text-green"
						href={`https://www.coupang.com/np/search?component=&q=${name}&channel=user`}
					>
						자주 구매한 상품 링크 <BsArrowRight className="ml-2" />
					</a>
				</div>
			)}
			{/* 소비기한 임박 알림 */}
			{type === 1 && (
				<div className="ml-4">
					<div className="w-full mb-1 text-sm font-bold text-left">
						<span className="text-green">{name}</span>의 소비기한이 {msg}
					</div>
					<Link className="flex items-center text-xs text-green" to={`/foods/${foodId}`}>
						상세 페이지로 이동하기 <BsArrowRight className="ml-2" />
					</Link>
				</div>
			)}
			{/* 소비기한 만료 알림 */}
			{type === 2 && (
				<div className="ml-4">
					<div className="w-full mb-1 text-sm font-bold text-left ">
						<span className="text-green">{name}</span>의 소비기한이 끝났어요!😭
					</div>
					<Link className="flex items-center text-xs text-green" to={`/foods/${foodId}`}>
						상세 페이지로 이동하기 <BsArrowRight className="ml-2" />
					</Link>
				</div>
			)}
		</div>
	);
}

export default Alarm;
