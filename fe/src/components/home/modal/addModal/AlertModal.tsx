import React from 'react';
import Modal from '../../../common/modal/Modal';

interface Props {
	open: boolean;
	type: number;
	isConsume: boolean;
	onClose(): void;
}

function AlertModal({ open, onClose, type, isConsume }: Props) {
	return (
		<Modal mode="alert" size="sm" label="알림" open={open} onClose={onClose} submitText="확인" onSubmit={onClose}>
			{type === 0 ? (
				// 유통기한 입력에 대한 오류인 경우
				<span>{isConsume ? '소비기한' : '유통기한'}과 제조일자를 확인해주세요!</span>
			) : (
				// 예측 소비기한 설명인 경우
				<div className="whitespace-pre-wrap text-left flex flex-col gap-2">
					<span>바코드 입력 시 저장된 소비기한 정보를 토대로 연산한 예측 소비기한을 사용합니다.</span>
					<span>정확한 소비기한을 사용하기 위해서는 직접 소비기한 정보를 기입해야 합니다.</span>
				</div>
			)}
		</Modal>
	);
}

export default AlertModal;
