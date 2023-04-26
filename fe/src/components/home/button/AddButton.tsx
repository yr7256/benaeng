import React from 'react';
import { TbPlus } from 'react-icons/tb';

interface Props {
	/**
	 * 모드
	 */
	onClick(): void;
}

/**
 * Primary UI component for user interaction
 */
function AddButton({ onClick }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-12 h-12 bg-green rounded-full cursor-pointer flex justify-center items-center shadow-xl"
		>
			<TbPlus strokeWidth={4} className="text-white text-2xl" />
		</button>
	);
}

export default AddButton;
