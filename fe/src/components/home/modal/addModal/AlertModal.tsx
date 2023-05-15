import React, { useMemo } from 'react';
import Modal from '../../../common/modal/Modal';

interface Props {
	open: boolean;
	type: number;
	isConsume: boolean;
	onClose(): void;
	onSubmit(): void;
}

function AlertModal({ open, onClose, type, isConsume, onSubmit }: Props) {
	const Content = useMemo(() => {
		switch (type) {
			case 0: // 유통기한 입력에 대한 오류인 경우
				return <span>{isConsume ? '소비기한' : '유통기한'}과 제조일자를 확인해주세요!</span>;
			case 1: // 예측 소비기한 설명인 경우
				return (
					<div className="whitespace-pre-wrap text-left flex flex-col gap-2">
						<span>바코드 입력 시 저장된 소비기한 정보를 토대로 연산한 예측 소비기한을 사용합니다.</span>
						<span>정확한 소비기한을 사용하기 위해서는 직접 소비기한 정보를 기입해야 합니다.</span>
					</div>
				);
			case 2: // 입력 폼을 모두 채우지 않은 경우
				return (
					<div className="whitespace-pre-wrap text-left flex flex-col gap-2">
						<span>식품 등록을 위해 카테고리와 수량, 식품명을 입력해주세요</span>
					</div>
				);
			case 3:
				return (
					<div className="whitespace-pre-wrap text-left flex flex-col gap-2">
						<span>{isConsume ? '소비기한' : '유통기한'} 미기입 시 기본 값인 1년으로 간주되어 저장됩니다.</span>
					</div>
				);
			default:
				return <span>Error</span>;
		}
	}, [type, isConsume]);

	if (type === 3)
		return (
			<Modal mode="confirm" size="sm" label="알림" open={open} onClose={onClose} submitText="확인" onSubmit={onSubmit}>
				{Content}
			</Modal>
		);

	return (
		<Modal mode="alert" size="sm" label="알림" open={open} onClose={onClose} submitText="확인" onSubmit={onClose}>
			{Content}
		</Modal>
	);
}

export default AlertModal;
