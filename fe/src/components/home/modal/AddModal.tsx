import React, { useState } from 'react';
import moment from 'moment';
import { FoodRequest } from '../../../types/FoodTypes';
import CheckInput from '../../common/input/CheckInput';
import Input from '../../common/input/Input';
import Modal from '../../common/modal/Modal';
import SearchCategoryModal from './SearchCategoryModal';

// TODO: 음식 추가 요청에 대한 request data 형태 수정 필요 : 소비기한, 유통기한의 분류, 권장 소비기한 사용 여부
// TODO: 카테고리 결정 후 소비기한에 대한 정보를 받아서 프론트에서 처리하는 형태인지 물어보기
// TODO: 소비기한, 유통기한 input을 모두 둘지, 현재처럼 check input으로 둘 중 선택할지 토의

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
	 * 소비기한 직접입력 선택여부
	 */
	useHandwritingDate: boolean;
}

function AddModal({ open, setClose }: Props) {
	const [openSearchCategoryModal, setOpenSearchCategoryModal] = useState<boolean>(false);
	const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
	const [form, setForm] = useState<AddFrom>({
		category: '',
		subCategory: '',
		name: '',
		count: '',
		manufacturingDate: '',
		expirationDate: '',
		isSellByDate: false,
		useHandwritingDate: true,
	});

	/**
	 * form data 변경 이벤트
	 */
	const onChangeForm = (value: string | number | boolean, target: string) => {
		let newValue = value;

		// 입력 예외처리(수량)
		if (target === 'count' && newValue !== '') {
			newValue = Math.abs(Number(newValue));
		}

		// 예외처리된 값에 대해 변경처리 진행
		if (target in form) {
			setForm({ ...form, [target]: newValue });
		}
	};

	/**
	 * 제조일자·소비기한 설정 이벤트
	 */
	const onChangeDate = (value: string, target: 'manufacturingDate' | 'expirationDate') => {
		let manufacturingDate = moment();
		let expirationDate = moment();

		if (target === 'manufacturingDate') {
			manufacturingDate = moment(value, 'YYYY-MM-DD');
			expirationDate = moment(form.expirationDate ?? value, 'YYYY-MM-DD');
		}
		if (target === 'expirationDate') {
			manufacturingDate = moment(form.manufacturingDate ?? value, 'YYYY-MM-DD');
			expirationDate = moment(value, 'YYYY-MM-DD');
		}

		if (expirationDate.diff(manufacturingDate) < 0) {
			setOpenAlertModal(true);
			setForm({ ...form, [target]: '' });
		} else {
			setForm({ ...form, [target]: value });
		}
	};

	/**
	 * 카테고리 설정 이벤트
	 */
	const setCategory = (category: string, subCategory: string) => {
		setForm({ ...form, category, subCategory });
		setOpenSearchCategoryModal(false);
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
							setValue={value => onChangeForm(value, '')}
							className="flex-1 min-w-0"
						/>
						<Input
							icon="category"
							label="세부분류"
							type="text"
							disabled={undefined}
							value={form.subCategory}
							setValue={value => onChangeForm(value, '')}
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
						value={!form.useHandwritingDate}
						onToggle={() => onChangeForm(!form.useHandwritingDate, 'useHandwritingDate')}
						disabled={undefined}
						className="text-green font-bold mt-4"
					>
						소비기한 직접 입력
					</CheckInput>

					<span className="text-left text-xs mb-2 text-light/boldStroke dark:text-dark/boldStroke">
						* 미기입시 추천 권장소비기한이 적용됩니다.
					</span>

					<Input
						icon="calendar"
						label="제조일자"
						type="date"
						disabled={form.useHandwritingDate}
						value={form.manufacturingDate}
						setValue={value => onChangeDate(value, 'manufacturingDate')}
						className="flex-initial w-44"
					/>
					<div className="flex items-center justify-between">
						<Input
							icon="calendar"
							label={form.isSellByDate ? '유통기한' : '소비기한'}
							type="date"
							disabled={form.useHandwritingDate}
							value={form.expirationDate}
							setValue={value => onChangeDate(value, 'expirationDate')}
							className="flex-initial w-44"
						/>
						<CheckInput
							disabled={form.useHandwritingDate}
							value={form.isSellByDate && !form.useHandwritingDate}
							onToggle={() => onChangeForm(!form.isSellByDate, 'isSellByDate')}
							className={undefined}
						>
							유통기한
						</CheckInput>
					</div>
				</div>
			</Modal>

			{/* 식품 분류 선택 모달 */}
			<SearchCategoryModal
				open={openSearchCategoryModal}
				onClose={() => {
					setOpenSearchCategoryModal(false);
				}}
				onSubmit={setCategory}
			/>

			{/* 알림 모달 */}
			<Modal
				mode="alert"
				size="sm"
				label="알림"
				open={openAlertModal}
				onClose={() => setOpenAlertModal(false)}
				submitText="확인"
				onSubmit={() => setOpenAlertModal(false)}
			>
				{form.isSellByDate ? '유통기한' : '소비기한'}과 제조일자를 확인해주세요!
			</Modal>
		</>
	);
}

export default AddModal;
