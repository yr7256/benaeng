import React from 'react';
import Topbar from '../components/common/topbar/Topbar';
import { useAppSelector } from '../hooks/useStore';
import { selectUser } from '../store/modules/user';
import Toggle from '../components/common/toggle/Toggle';

// 설정 화면

function Setting() {
	const userInfo = useAppSelector(selectUser);
	return (
		<div>
			<Topbar />
			<div className="component">
				<div>다크모드</div>
				<Toggle isCheck={false} onState={userInfo.isDark} type="isDark" />
			</div>
			<div className="component">
				<div>알림 받기</div>
				<Toggle isCheck={false} onState={userInfo.isAlarm} type="isAlarm" />
			</div>
			<div className="component">
				<div>
					<div>소비기한 임박 식품 알림</div>
					<Toggle isCheck={!userInfo.isAlarm} onState={userInfo.isAlarm ? userInfo.isCycle : false} type="isCycle" />
				</div>
				<div>
					<div>식품 구매주기 알림</div>
					<Toggle
						isCheck={!userInfo.isAlarm}
						onState={userInfo.isAlarm ? userInfo.isPurchase : false}
						type="isPurchase"
					/>
				</div>
			</div>
		</div>
	);
}

export default Setting;
