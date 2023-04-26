import React, { useMemo } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { TbCalculator, TbCalendar, TbCategory2, TbPencil, TbSearch } from 'react-icons/tb';
import './Input.css';

interface Props {
	/**
	 * 아이콘
	 */
	icon: 'category' | 'pencil' | 'count' | 'calendar' | 'search' | undefined;
	/**
	 * 라벨
	 */
	label: string;
	/**
	 * 타입
	 */
	type: 'number' | 'text' | 'date' | 'password';
	/**
	 * 값
	 */
	value: string;
	/**
	 * 값 변경 함수
	 */
	setValue(value: string): void;
}

/**
 * Primary UI component for user interaction
 */
function Input({ icon, label, type = 'text', value, setValue }: Props) {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	/** 아이콘 선택자 */
	const iconTag = useMemo(() => {
		switch (icon) {
			case 'pencil':
				return <TbPencil />;
			case 'calendar':
				return <TbCalendar />;
			case 'category':
				return <TbCategory2 />;
			case 'search':
				return <TbSearch />;
			case 'count':
				return <TbCalculator />;
			default:
				return undefined;
		}
	}, [icon]);

	return (
		<div className="group box-border stroke background border rounded-lg flex items-center h-10 px-3 focus-within:border-green focus-within:border-2 changing">
			<div className="group-focus-within:text-green text-light/boldStroke dark:text-dark/boldStroke mr-1 text-xl">
				{iconTag}
			</div>
			<input
				className="text-sm flex-1 text text-start before:text-light/boldStroke dark:before:text-dark/boldStroke placeholder:text-light/boldStroke dark:placeholder:text-dark/boldStroke"
				aria-required={type === 'date'}
				required={type === 'date'}
				data-placeholder={value || label}
				placeholder={label}
				type={type}
				value={value}
				onChange={onChange}
				onChangeCapture={onChange}
			/>
		</div>
	);
}

export default Input;
