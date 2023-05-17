import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
// import { Cookies } from 'react-cookie';
import Topbar from '../components/common/topbar/Topbar';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { logout, selectUser } from '../store/modules/user';
import Toggle from '../components/common/toggle/Toggle';
import { USER_API, usePutUser } from '../apis/user';
import sendToken from '../apis/token';
import { removeCookie } from '../utils/cookie';
import Modal from '../components/common/modal/Modal';
import { FOOD_API, getFoodInit } from '../apis/foods';

// 설정 화면

function Setting() {
	// const cookie = new Cookies();

	const dispatch = useAppDispatch();
	const navigator = useNavigate();
	const userInfo = useAppSelector(selectUser);

	// modal 상태 관리
	const [alartLogout, setAlartLogout] = useState(false);
	const [alartInit, setAlartInit] = useState(false);

	// 초기화 쿼리 호출 state
	const [isInit, setIsInit] = useState(false);

	// 쿼리문
	const mutation = useMutation([USER_API], () => usePutUser(userInfo));
	const sendTokenMutation = useMutation((deviceToken: string) => sendToken(deviceToken));
	useQuery([FOOD_API, isInit], () => getFoodInit(), {
		enabled: isInit,
		onSuccess: () => {
			setIsInit(false);
			setAlartInit(false);
			navigator('/');
		},
	});
	useEffect(() => {
		mutation.mutate();
	}, [userInfo]);

	useEffect(() => {
		async function sendDeviceToken() {
			try {
				const deviceToken = await window.flutter_inappwebview.callHandler('requestToken');
				await sendTokenMutation.mutate(deviceToken);
				console.log('Device token sent successfully');
			} catch (error) {
				console.error('Error sending device token:', error);
			}
		}

		sendDeviceToken();
	}, []);

	// 로그아웃 실행
	const handleLogout = () => {
		removeCookie('accessToken');
		console.log('이제  state 변경');
		dispatch(logout());
		// setAlartLogout(false);
		// navigator('/');
	};

	// 냉장고 초기화 실행
	const handleInit = () => {
		setIsInit(true);
	};

	return (
		<div className="px-6 pt-10">
			{alartLogout && (
				<Modal
					mode="confirm"
					size="sm"
					label="로그아웃"
					open={alartLogout}
					onClose={() => setAlartLogout(false)}
					submitText="확인"
					onSubmit={handleLogout}
				>
					<div className="my-4 text-center">로그아웃 하시겠습니까 ?</div>
				</Modal>
			)}
			{alartInit && (
				<Modal
					mode="confirm"
					size="sm"
					label="초기화"
					open={alartInit}
					onClose={() => setAlartInit(false)}
					submitText="확인"
					onSubmit={handleInit}
				>
					<div className="my-4 text-center">
						냉장고에 있는 상품을
						<br /> 모두 삭제 하시겠습니까 ?
					</div>
				</Modal>
			)}
			<Topbar />
			<div className="flex items-center justify-between px-6 py-3 mb-4 border-2 rounded-2xl stroke bg-light/component dark:bg-dark/component text-light/text dark:text-dark/text">
				<div>다크모드</div>
				<Toggle isCheck={false} onState={userInfo.isDark} type="isDark" />
			</div>
			<div className="mb-4 border-2 rounded-2xl stroke bg-light/component dark:bg-dark/component text-light/text dark:text-dark/text">
				<div className="flex items-center justify-between px-6 py-3 border-b-2 stroke">
					<div>알림 받기</div>
					<Toggle isCheck={false} onState={userInfo.isAlarm} type="isAlarm" />
				</div>
				<div className="flex items-center justify-between px-6 py-3">
					<div className={`${userInfo.isAlarm ? 'text-text' : 'text-light/stroke dark:text-dark/stroke'}`}>
						소비기한 임박 식품 알림
					</div>
					<Toggle isCheck={!userInfo.isAlarm} onState={userInfo.isAlarm ? userInfo.isCycle : false} type="isCycle" />
				</div>
				<div className="flex items-center justify-between px-6 py-3">
					<div className={`${userInfo.isAlarm ? 'text-text' : 'text-light/stroke dark:text-dark/stroke'}`}>
						식품 구매주기 알림
					</div>
					<Toggle
						isCheck={!userInfo.isAlarm}
						onState={userInfo.isAlarm ? userInfo.isPurchase : false}
						type="isPurchase"
					/>
				</div>
			</div>
			<div
				className="px-6 py-3 mb-4 text-left border-2 rounded-2xl text-red stroke bg-light/component dark:bg-dark/component"
				onClick={() => setAlartInit(true)}
			>
				냉장고 초기화하기
			</div>
			<div
				className="px-6 py-3 text-left border-2 rounded-2xl stroke bg-light/component dark:bg-dark/component text-light/text dark:text-dark/text"
				onClick={() => setAlartLogout(true)}
			>
				로그아웃
			</div>
		</div>
	);
}

export default Setting;
