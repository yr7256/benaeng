import React, { useState } from 'react';
import { VscQuestion } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import CheckInput from '../../common/input/CheckInput';
import Input from '../../common/input/Input';
import Modal from '../../common/modal/Modal';
import SearchCategoryModal from './SearchCategoryModal';
import { CategoryData, FoodData } from '../../../types';
import Category from '../../../constants/category.json';
import { selectBarcode } from '../../../store/modules/barcode';
import { getDateDiff } from '../../../utils/string';
import { postFood } from '../../../apis/foods';

/** AddModal Props */
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

/** 식품 추가 폼 */
export interface AddFrom extends FoodData {
	/** 유통기한 사용여부 */
	isConsume: boolean;
	/** 소비기한 직접입력 선택여부 */
	isRecommend: boolean;
}

/** 알람 모달 폼 */
interface AlertModal {
	open: boolean;
	type: number;
}

const CategoryList: CategoryData[] = Category.data;

function AddModal({ open, setClose }: Props) {
	const barcode = useSelector(selectBarcode);
	const [openSearchCategoryModal, setOpenSearchCategoryModal] = useState<boolean>(false);
	const [alertModal, setAlertModal] = useState<AlertModal>({
		open: false,
		type: 0,
	});
	const [form, setForm] = useState<AddFrom>({
		foodId: -1,
		totalCount: '',
		foodCategoryId: barcode.foodCategoryId,
		foodName: barcode.foodName,
		count: 0,
		startDate: '',
		endDate: '',
		isConsume: true,
		isRecommend: Boolean(barcode.barcode),
	});

	const category = CategoryList.find(item => item.foodCategoryId === form.foodCategoryId) ?? {
		category: '',
		subCategory: '',
		foodCategoryId: -1,
	};

	const onSubmit = async () => {
		// TODO: 빈 데이터가 있는지 확인

		const { data } = await postFood(form);
		if (data.resultCode === '200') setClose();
	};

	/** form data 변경 이벤트 */
	const onChangeForm = (value: string | number | boolean, target: string) => {
		let newValue = value;

		// 입력 예외처리(수량)
		if (target === 'totalCount' && newValue !== '') {
			newValue = Math.abs(Number(newValue));
		}

		// 예외처리된 값에 대해 변경처리 진행
		if (target in form) {
			setForm({ ...form, [target]: newValue });
		}
	};

	/** 제조일자·소비기한 설정 이벤트 */
	const onChangeDate = (value: string, target: 'startDate' | 'endDate') => {
		const nextForm = { ...form, [target]: value };

		const diff = getDateDiff(nextForm.startDate, nextForm.endDate);

		if (diff < 0) {
			setAlertModal({ open: true, type: 0 });
			setForm({ ...nextForm, [target]: '' });
		} else {
			setForm({ ...nextForm });
		}
	};

	/** 카테고리 설정 이벤트 */
	const setCategory = (foodCategoryId: number) => {
		setForm({ ...form, foodCategoryId });
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
				onSubmit={onSubmit}
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
							value={category.category}
							setValue={value => onChangeForm(value, '')}
							className="flex-1 min-w-0"
						/>
						<Input
							icon="category"
							label="세부분류"
							type="text"
							disabled={undefined}
							value={category.subCategory}
							setValue={value => onChangeForm(value, '')}
							className="flex-1 min-w-0"
						/>
					</div>

					<Input
						icon="pencil"
						label="식품명"
						type="text"
						disabled={undefined}
						value={form.foodName}
						setValue={value => onChangeForm(value, 'foodName')}
						className="flex-initial"
					/>
					<Input
						icon="count"
						label="수량"
						type="number"
						disabled={undefined}
						value={form.totalCount}
						setValue={value => onChangeForm(value, 'totalCount')}
						className="flex-initial w-28"
					/>

					<div className={`flex items-end ${!barcode.barcode ? 'opacity-60' : ''}`}>
						<CheckInput
							value={form.isRecommend}
							onToggle={() => onChangeForm(!form.isRecommend && Boolean(barcode.barcode), 'isRecommend')}
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
						disabled={form.isRecommend}
						value={form.startDate}
						setValue={value => onChangeDate(value, 'startDate')}
						className="flex-initial w-44"
					/>
					<div className="flex items-center justify-between">
						<Input
							icon="calendar"
							label={form.isConsume ? '소비기한' : '유통기한'}
							type="date"
							disabled={form.isRecommend}
							value={form.endDate}
							setValue={value => onChangeDate(value, 'endDate')}
							className="flex-initial w-44"
						/>
						<CheckInput
							disabled={form.isRecommend}
							value={!form.isConsume && !form.isRecommend}
							onToggle={() => onChangeForm(!form.isConsume, 'isConsume')}
							className={undefined}
						>
							유통기한 입력
						</CheckInput>
					</div>
				</div>
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
						<span>{form.isConsume ? '소비기한' : '유통기한'}과 제조일자를 확인해주세요!</span>
					) : (
						// 예측 소비기한 설명인 경우
						<div className="whitespace-pre-wrap text-left flex flex-col gap-2">
							<span>바코드 입력 시 저장된 소비기한 정보를 토대로 연산한 예측 소비기한을 사용합니다.</span>
							<span>정확한 소비기한을 사용하기 위해서는 직접 소비기한 정보를 기입해야 합니다.</span>
						</div>
					)}
				</Modal>
			</Modal>
		</>
	);
}

export default AddModal;
