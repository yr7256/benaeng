import React from 'react';
import './CheckInput.css';

interface Props {
	/**
	 * 체크여부
	 */
	value: boolean;
	/**
	 * 체크 변경 이벤트
	 */
	onToggle(): void;
	/**
	 * 라벨
	 */
	label: string;
	/**
	 * 활성화 여부
	 */
	disabled: boolean | undefined;
	/**
	 * 사용자 지정 클래스 추가
	 */
	className: string | undefined;
}

function CheckInput({ value, onToggle, label, disabled, className }: Props) {
	return (
		<div className={`${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
			<button type="button" onClick={onToggle} className="flex items-center text-sm">
				<div
					data-checked={value}
					className="center w-5 h-5 rounded-full border stroke background mr-2 before:bg-green"
				/>
				{label}
			</button>
		</div>
	);
}

export default CheckInput;
