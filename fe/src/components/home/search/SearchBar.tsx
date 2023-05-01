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
}

function SearchBar({ value, setValue }: Props) {
	/** input 변경 함수 */
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onReset = () => setValue('');

	return (
		<div className="border-2 border-green component flex items-center box-border h-10 p-3 gap-2">
			<TbSearch className="text-green text-xl" />
			<input className="flex-1 text-left" type="search" value={value} onChange={onChange} />
			<button type="button" onClick={onReset} disabled={!value} className="disabled:hidden">
				<TbCircleX className="text-light/boldStroke dark:text-dark/boldStroke text-xl" />
			</button>
		</div>
	);
}

export default SearchBar;
