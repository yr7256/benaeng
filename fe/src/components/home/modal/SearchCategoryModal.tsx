import React, { useState } from 'react';
import CheckInput from '../../common/input/CheckInput';
import Input from '../../common/input/Input';
import Modal from '../../common/modal/Modal';

// TODO: 카테고리 정보 받아오기
// TODO: 검색 기능 추가

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

/**
 * 카테고리(중·소분류)
 */
interface Category {
	id: number;
	category: string;
	subCategory: string;
}

function SearchCategoryModal({ open, onClose, onSubmit }: Props) {
	const [search, setSearch] = useState<string>('');
	const [value, setValue] = useState<Category>({ id: -1, category: '', subCategory: '' });

	return (
		<Modal
			mode="form"
			size="lg"
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
			<ul className="text-left flex flex-col gap-4 px-2 py-4">
				<li>
					<CheckInput
						value={value.id === 1}
						onToggle={() => {
							setValue({ id: 1, category: '가공식품', subCategory: '과자류' });
						}}
						disabled={undefined}
						className={undefined}
					>
						가공식품 <span className="text-green px-1">{'>'}</span> 과자류
					</CheckInput>
				</li>
				<li>
					<CheckInput
						value={value.id === 2}
						onToggle={() => {
							setValue({ id: 2, category: '가공식품', subCategory: '사탕류' });
						}}
						disabled={undefined}
						className={undefined}
					>
						가공식품 <span className="text-green px-1">{'>'}</span> 사탕류
					</CheckInput>
				</li>
				<li>
					<CheckInput
						value={value.id === 3}
						onToggle={() => {
							setValue({ id: 3, category: '가공식품', subCategory: '초콜릿과자류' });
						}}
						disabled={undefined}
						className={undefined}
					>
						가공식품 <span className="text-green px-1">{'>'}</span> 초콜릿과자류
					</CheckInput>
				</li>
			</ul>
		</Modal>
	);
}

export default SearchCategoryModal;
