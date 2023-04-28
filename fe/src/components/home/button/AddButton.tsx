import React from 'react';
import { TbPlus } from 'react-icons/tb';

interface Props {
	/**
	 * 모드
	 */
	onClick(): void;
	/**
	 * 사용자 지정 클래스 추가
	 */
	className: string;
}

/**
 * Primary UI component for user interaction
 */
function AddButton({ onClick, className }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`${className} w-20 h-20 bg-green rounded-full cursor-pointer flex justify-center items-center shadow-xl`}
		>
			<TbPlus strokeWidth={3} className="text-white text-5xl" />
		</button>
	);
}

export default AddButton;
