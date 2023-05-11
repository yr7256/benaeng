import React, { useMemo } from 'react';
import { BiBarcodeReader } from 'react-icons/bi';

import { TbCalculator, TbCalendar, TbCategory2, TbChevronUp, TbPencil, TbSearch } from 'react-icons/tb';
import './Input.css';

interface Props {
	/**
	 * 아이콘
	 */
	icon: 'category' | 'pencil' | 'count' | 'calendar' | 'search' | 'barcode' | undefined;
	/**
	 * 라벨
	 */
	label: string;
	/**
	 * 타입
	 */
	type: 'number' | 'text' | 'date' | 'password';
	/**
	 * 수정 가능 여부
	 */
	disabled: boolean | undefined;
	/**
	 * 값
	 */
	value: string | number;
	/**
	 * 값 변경 함수
	 */
	setValue(value: string): void;
	/**
	 * 사용자지정 클래스명
	 */
	className: string;
}

/**
 * Primary UI component for user interaction
 */
function Input({ icon, label, type = 'text', value, setValue, disabled, className }: Props) {
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
			case 'barcode':
				return <BiBarcodeReader />;
			default:
				return undefined;
		}
	}, [icon]);

	return (
		<div
			className={`${className} group box-border stroke background border rounded-lg flex items-center
			h-10 px-3 focus-within:border-green focus-within:border-2 changing
			${disabled ? 'opacity-50' : ''}`}
		>
			<div className="flex-initial mr-2 text-xl group-focus-within:text-green text-light/boldStroke dark:text-dark/boldStroke">
				{iconTag}
			</div>
			<input
				className="flex-1 min-w-0 text-sm text text-start before:text-light/boldStroke dark:before:text-dark/boldStroke placeholder:text-light/boldStroke dark:placeholder:text-dark/boldStroke"
				aria-required={type === 'date'}
				required={type === 'date'}
				readOnly={icon === 'category'}
				data-placeholder={value || label}
				placeholder={label}
				type={type}
				value={value}
				disabled={disabled}
				onChange={onChange}
				onChangeCapture={onChange}
			/>
			{icon === 'category' ? (
				<div className="flex-initial text-2xl group-focus-within:text-green text-light/boldStroke dark:text-dark/boldStroke">
					<TbChevronUp strokeWidth={2} className="rotate-180" />
				</div>
			) : undefined}
		</div>
	);
}

export default Input;
