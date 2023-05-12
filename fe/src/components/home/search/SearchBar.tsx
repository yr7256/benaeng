import React from 'react';
import { TbCircleX, TbSearch } from 'react-icons/tb';
import './SearchBar.css';

interface Props {
	/**
	 * 사용자 입력 값
	 */
	value: string;
	/**
	 * 사용자 입력 값 변경 함수
	 */
	setValue(value: string): void;
	/**
	 * 사용자 지정 스타일
	 */
	className: string | undefined;
}

function SearchBar({ value, setValue, className }: Props) {
	/** input 변경 함수 */
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onReset = () => setValue('');

	return (
		<div
			className={`group border-2 focus-within:border-[3px] border-green component flex items-center box-border h-10 p-3 gap-2 ${className}`}
		>
			<TbSearch className="text-green text-xl group-focus-within:stroke-[3px]" />
			<input className="flex-1 text-left" type="search" value={value} onChange={onChange} />
			<button type="button" onClick={onReset} disabled={!value} className="disabled:hidden">
				<TbCircleX className="text-light/boldStroke dark:text-dark/boldStroke text-xl" />
			</button>
		</div>
	);
}

export default SearchBar;
