import React from 'react';
import Topbar from '../components/common/topbar/Topbar';
import { AlarmData } from '../types/FoodTypes';
import Alarm from '../components/notice/alarm/Alarm';
import { useAppSelector } from '../hooks/useStore';
import { selectUser } from '../store/modules/user';

// 알림 화면

function Notice() {
	const user = useAppSelector(selectUser);
	const emptyNotice = `/assets/${user.isDark ? 'dark' : 'light'}/empty-notice.svg`;
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
		{
			id: 3,
			name: '허니머스타드',
			type: 0,
			subCategory: '소스',
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
		day[dDay]?.push(item);
	});
	const title: string[] = ['오늘', '어제', '그제', '3일 전', '4일 전', '5일 전', '6일 전', '일주일 전'];
	return (
		<div className="px-6 pt-10 page">
			<Topbar />
			{day.map((array, index) => {
				if (array.length > 1) {
					return (
						<div key={array[1].id + array[1].type} className="w-full">
							<div className="flex items-center justify-between w-full m-auto">
								<hr className="w-1/3 border rounded-lg stroke" />
								<div className="mx-4 text-light/boldStroke dark:text-dark/boldStroke">{title[index]}</div>
								<hr className="w-1/3 border rounded-lg stroke" />
							</div>
							{array.map(item => {
								if (item) {
									return (
										<div key={item.id} className="flex justify-center w-full my-4">
											<Alarm
												name={item.name}
												food={item.subCategory}
												type={item.type}
												day={item.dDay}
												foodId={item.id}
											/>
										</div>
									);
								}
								return null;
							})}
						</div>
					);
				}
				return null; // 요소가 없을 때는 null 반환
			})}
			{!alarmMsg && (
				<div className="mt-40">
					<img className="block m-auto mb-4" src={emptyNotice} alt="empty" />
					<div className="text-xl text-center text-light/boldStroke dark:text-dark/boldStroke">
						메시지가 존재하지 않습니다.
					</div>
				</div>
			)}
		</div>
	);
}

export default Notice;
