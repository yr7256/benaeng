import React from 'react';
import { useNavigate } from 'react-router';
import DDayFoodIcon from '../../common/foodIcon/DDayFoodIcon';

interface Props {
	/** 식품 id */
	id: number;
	/** 식품 아이콘(서브 카테고리) */
	icon: string;
	/** 남은 소비기한 */
	dDay: number;
	/** 식품명 */
	name: string;
}

function FoodIcon({ id, icon, dDay, name }: Props) {
	const navigate = useNavigate();

	const onClick = () => {
		navigate(`/foods/${id}`);
	};
	return (
		<button type="button" onClick={onClick}>
			<DDayFoodIcon dDay={dDay} icon={icon} />
			<span>{name}</span>
		</button>
	);
}

export default FoodIcon;
