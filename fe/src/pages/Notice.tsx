import React from 'react';
import Topbar from '../components/common/topbar/Topbar';
import { AlarmData } from '../types/FoodTypes';

// 알림 화면

function Notice() {
	// 날짜 별로 알림 메시지 분류
	const day: AlarmData[][] = Array.from(Array(8), item => new Array(item));
	const alarmMsg: AlarmData[] = [
		{
			id: 0,
			name: '서울우유',
			type: 0,
			subCategory: '우유',
			status: 0,
			date: '2023-04-28',
			dDay: 3,
		},
		{
			id: 1,
			name: '고향왕만두',
			type: 1,
			subCategory: '만두',
			status: 0,
			date: '2023-05-01',
			dDay: 2,
		},
		{
			id: 2,
			name: '식빵',
			type: 2,
			subCategory: '빵류',
			status: 2,
			date: '2023-04-25',
			dDay: 3,
		},
	];
	alarmMsg.forEach(item => {
		const start = new Date();
		const end = item.date.split('-');

		const sDate = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
		const eDate = new Date(Number(end[0]), Number(end[1]), Number(end[2]));

		const dDay = Math.abs((eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24));
		day[dDay].push(item);
	});
	return (
		<div>
			<Topbar />
			{/* { <Alarm name={msg.subCategory} food={msg.name} type={msg.type} day={msg.dDay} foodId={msg.id} />;
			} */}
		</div>
	);
}

export default Notice;
