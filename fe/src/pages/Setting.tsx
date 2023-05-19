import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Topbar from '../components/common/topbar/Topbar';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { logout, selectUser, updateUser } from '../store/modules/user';
import Toggle from '../components/common/toggle/Toggle';
// import sendToken from '../apis/token';
import Modal from '../components/common/modal/Modal';
import { getFoodInit } from '../apis/foods';

// 설정 화면

function Setting() {
	const dispatch = useAppDispatch();
	const navigator = useNavigate();
	const userInfo = useAppSelector(selectUser);

	// modal 상태 관리
	const [alartLogout, setAlartLogout] = useState(false);
	const [alartInit, setAlartInit] = useState(false);

	// 로그아웃 실행
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		dispatch(logout());
		// setAlartLogout(false);
		// navigator('/');
	};

	// 냉장고 초기화 실행
	const handleInit = async () => {
		await getFoodInit();
		setAlartInit(false);
		navigator('/');
	};

	return (
		<div className="px-6 pt-10">
			<Topbar />
			<div className="flex items-center justify-between px-6 py-3 mb-4 border-2 rounded-2xl stroke bg-light/component dark:bg-dark/component text-light/text dark:text-dark/text">
				<div>다크모드</div>
				<Toggle
					label="isDark"
					disabled={false}
					value={userInfo.isDark}
					onToggle={() => dispatch(updateUser({ ...userInfo, isDark: !userInfo.isDark }))}
					className=""
				/>
			</div>
			<div className="mb-4 border-2 rounded-2xl stroke bg-light/component dark:bg-dark/component text-light/text dark:text-dark/text">
				<div className="flex items-center justify-between px-6 py-3 border-b-2 stroke">
					<div>알림 받기</div>
					<Toggle
						label="isAlarm"
						disabled={false}
						value={userInfo.isAlarm}
						onToggle={() => dispatch(updateUser({ ...userInfo, isAlarm: !userInfo.isAlarm }))}
						className=""
					/>
				</div>
				<div className="flex items-center justify-between px-6 py-3">
					<div className={`${userInfo.isAlarm ? 'text-text' : 'text-light/stroke dark:text-dark/stroke'}`}>
						소비기한 임박 식품 알림
					</div>
					<Toggle
						label="isCycle"
						disabled={!userInfo.isAlarm}
						value={userInfo.isAlarm ? userInfo.isCycle : false}
						onToggle={() => dispatch(updateUser({ ...userInfo, isCycle: !userInfo.isCycle }))}
						className=""
					/>
				</div>
				<div className="flex items-center justify-between px-6 py-3">
					<div className={`${userInfo.isAlarm ? 'text-text' : 'text-light/stroke dark:text-dark/stroke'}`}>
						식품 구매주기 알림
					</div>
					<Toggle
						label="isPurchase"
						disabled={!userInfo.isAlarm}
						value={userInfo.isAlarm ? userInfo.isPurchase : false}
						onToggle={() => dispatch(updateUser({ ...userInfo, isPurchase: !userInfo.isPurchase }))}
						className=""
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

			{/* 모달 */}
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
		</div>
	);
}

export default Setting;
