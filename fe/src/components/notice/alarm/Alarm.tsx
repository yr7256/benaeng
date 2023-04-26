import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import FoodIcon from '../../common/foodIcon/FoodIcon';

/** alarm props 타입 */
interface Props {
	food: string;
	type: number;
	day: number;
	id: number;
}

function Alarm({ food, type, day, id }: Props) {
	// 음식명, 알림 타입, d-day, 음식 id
	return (
		<div className="flex items-center justify-around h-24 border-2 rounded-lg max-w-88 text component stroke">
			<FoodIcon food={food} />
			{/* 구매주기 알림 */}
			{type === 0 && (
				<div>
					<div className="mb-1 text-sm font-bold text-left max-w-60">
						슬슬 <span className="text-green">{food}</span>을(를) 구매해야 할 시기에요
					</div>
					<a
						className="flex items-center text-xs text-green"
						href={`https://www.coupang.com/np/search?component=&q=${food}&channel=user`}
					>
						구매 페이지로 이동하기 <BsArrowRight className="ml-2" />
					</a>
				</div>
			)}
			{/* 소비기한 임박 알림 */}
			{type === 1 && (
				<div>
					<div className="mb-1 text-sm font-bold text-left max-w-60">
						<span className="text-green">{food}</span>의 소비기한이 <span className="text-green">{day}</span>일 남았어요
					</div>
					<Link className="flex items-center text-xs text-green" to={`foods/${id}`}>
						상세 페이지로 이동하기 <BsArrowRight className="ml-2" />
					</Link>
				</div>
			)}
			{/* 소비기한 만료 알림 */}
			{type === 2 && (
				<div>
					<div className="mb-1 text-sm font-bold text-left max-w-60">
						<span className="text-green">{food}</span>의 소비기한이 끝났어요!😭
					</div>
					<Link className="flex items-center text-xs text-green" to={`foods/${id}`}>
						상세 페이지로 이동하기 <BsArrowRight className="ml-2" />
					</Link>
				</div>
			)}
		</div>
	);
}

export default Alarm;
