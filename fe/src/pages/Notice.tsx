import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Topbar from '../components/common/topbar/Topbar';
import { AlarmData } from '../types/FoodTypes';
import Alarm from '../components/notice/alarm/Alarm';
import { useAppSelector } from '../hooks/useStore';
import { selectUser } from '../store/modules/user';
import { getAlarm, ALARM_API, putAlarm } from '../apis/alarm';

// 알림 화면

function Notice() {
	const user = useAppSelector(selectUser);
	const emptyNotice = `/assets/${user.isDark ? 'dark' : 'light'}/empty-notice.svg`;

	/** 알림 조회 쿼리 */
	const query = useQuery([ALARM_API], () => getAlarm(), {
		keepPreviousData: true,
		select: res => res.data.data,
	});

	/** 알림 읽음 처리 */
	const mutation = useMutation([ALARM_API], () => putAlarm());

	// 날짜 별로 알림 메시지 분류
	const day: AlarmData[][] = Array.from(Array(8), item => new Array(item));
	if (!query.isFetching && query.data) {
		query.data.forEach(item => {
			const start = new Date();
			const end = item.createDate.split('-');

			const sDate = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
			const eDate = new Date(Number(end[0]), Number(end[1]), Number(end[2]));

			const dDay = Math.abs((eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24));
			day[dDay]?.push(item);
		});
	}
	const title: string[] = ['오늘', '어제', '그제', '3일 전', '4일 전', '5일 전', '6일 전', '일주일 전'];

	// 렌더링 시 알림 읽음 처리
	useEffect(() => {
		mutation.mutate();
	}, []);

	return (
		<div className="px-6 pt-10 page">
			<Topbar />
			{day.map((array, index) => {
				if (array.length > 1) {
					return (
						<div key={array[1].foodId + array[1].type} className="w-full">
							<div className="flex items-center justify-between w-full m-auto">
								<hr className="w-1/3 border rounded-lg stroke" />
								<div className="mx-4 text-light/boldStroke dark:text-dark/boldStroke">{title[index]}</div>
								<hr className="w-1/3 border rounded-lg stroke" />
							</div>
							{array.map(item => {
								if (item) {
									return (
										<div key={item.foodId} className="flex justify-center w-full my-4">
											<Alarm
												name={item.foodName}
												food={item.foodCategoryId}
												type={item.type}
												day={item.dday}
												foodId={item.foodId}
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
			{!query.data && (
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
