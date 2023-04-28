import React, { useState } from 'react';
import moment from 'moment';
import { VscQuestion } from 'react-icons/vsc';
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
	 * 소비기한 직접입력 선택여부
	 */
	useRecommendedDate: boolean;
}

// TODO: Alert Modal의 경우 추후 외부로 뺄 예정
/**
 * 알람 모달 폼
 */
interface AlertModal {
	open: boolean;
	type: number;
}

function AddModal({ open, setClose }: Props) {
	const [openSearchCategoryModal, setOpenSearchCategoryModal] = useState<boolean>(false);
	const [alertModal, setAlertModal] = useState<AlertModal>({
		open: false,
		type: 0,
	});
	const [form, setForm] = useState<AddFrom>({
		category: '',
		subCategory: '',
		name: '',
		count: '',
		manufacturingDate: '',
		expirationDate: '',
		isSellByDate: false,
		useRecommendedDate: true,
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
			setAlertModal({ open: true, type: 0 });
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

					<div className="flex items-end">
						<CheckInput
							value={form.useRecommendedDate}
							onToggle={() => onChangeForm(!form.useRecommendedDate, 'useRecommendedDate')}
							disabled={undefined}
							className="text-green font-bold mt-4"
						>
							예측 소비기한 사용
						</CheckInput>
						<button
							type="button"
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation();
								setAlertModal({
									open: true,
									type: 1,
								});
							}}
							className="text-xl px-1 text-green"
						>
							<VscQuestion />
						</button>
					</div>

					<span className="text-left text-xs mb-2 text-light/boldStroke dark:text-dark/boldStroke">
						* 등록일 기준으로 연산한 소비기한을 사용합니다.
					</span>

					<Input
						icon="calendar"
						label="제조일자"
						type="date"
						disabled={form.useRecommendedDate}
						value={form.manufacturingDate}
						setValue={value => onChangeDate(value, 'manufacturingDate')}
						className="flex-initial w-44"
					/>
					<div className="flex items-center justify-between">
						<Input
							icon="calendar"
							label={form.isSellByDate ? '유통기한' : '소비기한'}
							type="date"
							disabled={form.useRecommendedDate}
							value={form.expirationDate}
							setValue={value => onChangeDate(value, 'expirationDate')}
							className="flex-initial w-44"
						/>
						<CheckInput
							disabled={form.useRecommendedDate}
							value={form.isSellByDate && !form.useRecommendedDate}
							onToggle={() => onChangeForm(!form.isSellByDate, 'isSellByDate')}
							className={undefined}
						>
							유통기한 입력
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
				open={alertModal.open}
				onClose={() => setAlertModal({ ...alertModal, open: false })}
				submitText="확인"
				onSubmit={() => setAlertModal({ ...alertModal, open: false })}
			>
				{alertModal.type === 0 ? (
					// 유통기한 입력에 대한 오류인 경우
					<span>{form.isSellByDate ? '유통기한' : '소비기한'}과 제조일자를 확인해주세요!</span>
				) : (
					// 예측 소비기한 설명인 경우
					<div className="whitespace-pre-wrap text-left flex flex-col gap-2">
						<span>바코드 입력 시 저장된 소비기한 정보를 토대로 연산한 예측 소비기한을 사용합니다.</span>
						<span>정확한 소비기한을 사용하기 위해서는 직접 소비기한 정보를 기입해야 합니다.</span>
					</div>
				)}
			</Modal>
		</>
	);
}

export default AddModal;
