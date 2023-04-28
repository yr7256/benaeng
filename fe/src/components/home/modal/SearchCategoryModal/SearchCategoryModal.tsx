import React, { useState } from 'react';
import { Category } from '../../../../types/FoodTypes';
import Input from '../../../common/input/Input';
import Modal from '../../../common/modal/Modal';
import SearchCategorySelectList from './SearchCategorySelectList';

/**
 * SearchCategoryModal Props
 */
interface Props {
	/**
	 * 모달 열림 여부
	 */
	open: boolean;
	/**
	 * 모달 닫힘 이벤트
	 */
	onClose(): void;
	/**
	 * 카테고리 변경 이벤트
	 */
	onSubmit(category: string, subCategory: string): void;
}

function SearchCategoryModal({ open, onClose, onSubmit }: Props) {
	const [search, setSearch] = useState<string>('');
	const [value, setValue] = useState<Category>({ id: -1, category: '', subCategory: '' });

	return (
		<Modal
			mode="form"
			size="sm"
			label="식품 분류 검색"
			open={open}
			onClose={onClose}
			submitText="선택완료"
			onSubmit={() => onSubmit(value.category, value.subCategory)}
		>
			<Input
				icon="search"
				label="식품분류 검색"
				type="text"
				disabled={false}
				value={search}
				setValue={setSearch}
				className=""
			/>
			<div className="center h-40 overflow-y-auto mt-4">
				<SearchCategorySelectList search={search} value={value} setValue={setValue} />
			</div>
		</Modal>
	);
}

export default SearchCategoryModal;
