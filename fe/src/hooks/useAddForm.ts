import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postFood } from '../apis/foods';
import { selectBarcode } from '../store/modules/barcode';
import { FoodData } from '../types';
import { getDateDiff } from '../utils/string';

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

type ChangeType = 'default' | 'date' | 'category';
type ReturnType = [
	AddFrom,
	(type: ChangeType) => (value: string | number | boolean, target: string) => void,
	() => Promise<void>,
];

function useAddForm(
	onCloseAddModal: () => void,
	setCategoryModal: (bool: boolean) => void,
	setAlertModal: (value: AlertModal) => void,
): ReturnType {
	const barcode = useSelector(selectBarcode);
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

	const onSubmit = async () => {
		if (!form.foodName || !form.totalCount || !form.foodCategoryId) {
			setAlertModal({ type: 2, open: true });
		} else if (!form.endDate) {
			setAlertModal({ type: 3, open: true });
		} else {
			const { data } = await postFood(form);
			if (data.resultCode === '200') onCloseAddModal();
		}
	};

	/** form data 변경 이벤트 */
	const onChangeData = (value: string | number | boolean, target: string) => {
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
	const onChangeDate = (value: string | number | boolean, target: string) => {
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
	const setCategory = (value: string | number | boolean) => {
		const foodCategoryId = Number(value);
		setForm({ ...form, foodCategoryId });
		setCategoryModal(false);
	};

	const onChangeForm = (type: ChangeType) => {
		switch (type) {
			case 'date':
				return onChangeDate;
			case 'category':
				return setCategory;
			case 'default':
			default:
				return onChangeData;
		}
	};

	return [form, onChangeForm, onSubmit];
}

export default useAddForm;
