import React, { useState } from 'react';
import { FoodRequest } from '../../../types/FoodTypes';
import CheckInput from '../../common/input/CheckInput';
import Input from '../../common/input/Input';
import Modal from '../../common/modal/Modal';
import SearchCategoryModal from './SearchCategoryModal';

/**
 * AddModal Props
 */
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

/**
 * 식품 추가 폼
 */
interface AddFrom extends FoodRequest {
	/**
	 * 유통기한 사용여부
	 */
	isSellByDate: boolean;
	/**
	 * 추천(권장)소비기한 사용여부
	 */
	useSuggestedDate: boolean;
}

function AddModal({ open, setClose }: Props) {
	const [openSearchCategoryModal, setOpenSearchCategoryModal] = useState<boolean>(false);
	const [form, setForm] = useState<AddFrom>({
		category: '',
		sub_category: '',
		name: '',
		count: '',
		manufacturing_date: '',
		expiration_date: '',
		isSellByDate: false,
		useSuggestedDate: true,
	});

	/**
	 * form data 변경 이벤트
	 */
	const onChangeForm = (value: string | number | boolean, target: string) => {
		if (target in form) {
			setForm({ ...form, [target]: value });
		}
	};

	return (
		<>
			{/* 식품 추가 모달 */}
			<Modal
				mode="form"
				size="lg"
				label="식품 추가"
				open={open}
				onClose={setClose}
				submitText="추가하기"
				onSubmit={setClose}
			>
				{/* 추가 폼 */}
				<div className="flex flex-col gap-2">
					{/* 상품 카테고리 */}
					<div className="flex w-full gap-2" onClick={() => setOpenSearchCategoryModal(true)}>
						<Input
							icon="category"
							label="식품분류"
							type="text"
							disabled={undefined}
							value={form.category}
							setValue={value => onChangeForm(value, 'category')}
							className="flex-1 min-w-0"
						/>
						<Input
							icon="category"
							label="세부분류"
							type="text"
							disabled={undefined}
							value={form.sub_category}
							setValue={value => onChangeForm(value, 'sub_category')}
							className="flex-1 min-w-0"
						/>
					</div>

					<Input
						icon="pencil"
						label="식품명"
						type="text"
						disabled={undefined}
						value={form.name}
						setValue={value => onChangeForm(value, 'name')}
						className="flex-initial"
					/>
					<Input
						icon="count"
						label="수량"
						type="number"
						disabled={undefined}
						value={form.count}
						setValue={value => onChangeForm(value, 'count')}
						className="flex-initial w-28"
					/>

					<CheckInput
						value={form.useSuggestedDate}
						onToggle={() => onChangeForm(!form.useSuggestedDate, 'useSuggestedDate')}
						label="소비기한 직접 입력"
						disabled={undefined}
						className="text-green font-bold mt-4"
					/>
					<span className="text-left text-xs mb-2 text-light/boldStroke dark:text-dark/boldStroke">
						* 미기입시 추천 권장소비기한이 적용됩니다.
					</span>

					<Input
						icon="calendar"
						label="제조일자"
						type="date"
						disabled={form.useSuggestedDate}
						value={form.manufacturing_date}
						setValue={value => onChangeForm(value, 'manufacturing_date')}
						className="flex-initial w-44"
					/>
					<div className="flex items-center justify-between">
						<Input
							icon="calendar"
							label={form.isSellByDate ? '유통기한' : '소비기한'}
							type="date"
							disabled={form.useSuggestedDate}
							value={form.expiration_date}
							setValue={value => onChangeForm(value, 'expiration_date')}
							className="flex-initial w-44"
						/>
						<CheckInput
							disabled={form.useSuggestedDate}
							value={form.isSellByDate && !form.useSuggestedDate}
							onToggle={() => onChangeForm(!form.isSellByDate, 'isSellByDate')}
							label="유통기한"
							className={undefined}
						/>
					</div>
				</div>
			</Modal>

			{/* 식품 분류 선택 모달 */}
			<SearchCategoryModal
				open={openSearchCategoryModal}
				setClose={() => {
					setOpenSearchCategoryModal(false);
				}}
			/>
		</>
	);
}

export default AddModal;
