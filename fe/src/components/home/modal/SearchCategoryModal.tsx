import React, { useState } from 'react';
import Input from '../../common/input/Input';
import Modal from '../../common/modal/Modal';

interface Props {
	/**
	 * 모달 열림 여부
	 */
	open: boolean;
	/**
	 * 모달 닫힘 이벤트
	 */
	setClose(): void;
}

function SearchCategoryModal({ open, setClose }: Props) {
	const [search, setSearch] = useState<string>('');

	return (
		<Modal
			mode="form"
			size="lg"
			label="식품 분류 검색"
			open={open}
			onClose={setClose}
			submitText="선택완료"
			onSubmit={setClose}
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
		</Modal>
	);
}

export default SearchCategoryModal;
