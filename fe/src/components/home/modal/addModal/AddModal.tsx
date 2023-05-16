import React, { useState } from 'react';
import moment from 'moment';
import Input from '../../../common/input/Input';
import Modal from '../../../common/modal/Modal';
import SearchCategoryModal from '../SearchCategoryModal';
import useAddForm from '../../../../hooks/useAddForm';
import CategoryForm from './CategoryForm';
import AlertModal from './AlertModal';
import DateForm from './DateForm';

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

/** 알람 모달 폼 */
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
	const [form, setForm, onSubmit] = useAddForm(setClose, setOpenSearchCategoryModal, setAlertModal);
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
					<CategoryForm foodCategoryId={form.foodCategoryId} setCategoryModal={setOpenSearchCategoryModal} />

					<Input
						icon="pencil"
						label="식품명"
						type="text"
						disabled={undefined}
						value={form.foodName}
						setValue={value => setForm('default')(value, 'foodName')}
						className="flex-initial"
					/>
					<Input
						icon="count"
						label="수량"
						type="number"
						disabled={undefined}
						value={form.totalCount}
						setValue={value => setForm('default')(value, 'totalCount')}
						className="flex-initial w-28"
					/>
				</div>
				<DateForm
					form={form}
					setData={setForm('default')}
					setDate={setForm('date')}
					openAlertModal={() => setAlertModal({ type: 1, open: true })}
				/>

				{/* 식품 분류 선택 모달 */}
				<SearchCategoryModal
					open={openSearchCategoryModal}
					onClose={() => {
						setOpenSearchCategoryModal(false);
					}}
					onSubmit={(id: number) => setForm('category')(id, '')}
				/>

				{/* 알림 모달 */}
				<AlertModal
					open={alertModal.open}
					type={alertModal.type}
					isConsume={form.isConsume}
					onClose={() => setAlertModal({ ...alertModal, open: false })}
					onSubmit={() => {
						setForm('date')(moment().add(1, 'years').format('YYYY-MM-DD'), 'endDate');
						setAlertModal({ ...alertModal, open: false });
					}}
				/>
			</Modal>
		</>
	);
}

export default AddModal;
