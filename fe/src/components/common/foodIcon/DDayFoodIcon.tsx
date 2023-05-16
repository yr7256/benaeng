import React, { useMemo } from 'react';

interface Props {
	/**
	 * d-day
	 */
	dDay: number;
	/**
	 * 음식 아이콘(하위 카테고리)
	 */
	icon: string;
}

function DDayFoodIcon({ dDay, icon }: Props) {
	/** 디데이 컬러 */
	const DayColor = useMemo<string>(() => {
		if (dDay > 7) return 'bg-green';
		if (dDay > 2) return 'bg-yellow';
		return 'bg-red';
	}, [dDay]);

	const dayCnt = dDay > 99 ? 99 : dDay;

	return (
		<div className="box-border relative w-full aspect-square bg-skyBlue rounded-xl center">
			<div className={`absolute -top-1 -left-1 text-white ${DayColor} text-[11px] rounded-full center w-11 h-5`}>
				{/* 표시는 최대 절댓값 99까지로 제한합니다 */}
				<span className="font-bold">
					D{dayCnt < 0 ? '+' : '-'}
					{dayCnt === 0 ? 'day' : Math.abs(dayCnt)}
				</span>
				{/* 99가 넘는 경우 +표시로 그 이상임을 표현합니다 */}
				<sup className="font-thin">{Math.abs(dDay) > 99 ? `+` : ``}</sup>
			</div>
			<img className="w-full p-2" alt={icon} src={`/assets/food/${icon}.svg`} />
		</div>
	);
}

export default DDayFoodIcon;
