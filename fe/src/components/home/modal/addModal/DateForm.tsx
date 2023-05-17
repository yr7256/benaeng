import React from 'react';
import { VscQuestion } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { AddFrom } from '../../../../hooks/useAddForm';
import { selectBarcode } from '../../../../store/modules/barcode';
import { getExpireDayStr, getTodayStr } from '../../../../utils/string';
import CheckInput from '../../../common/input/CheckInput';
import Input from '../../../common/input/Input';
import CategoryData from '../../../../constants/category.json';

interface Props {
	form: AddFrom;
	setForm: React.Dispatch<React.SetStateAction<AddFrom>>;
	setData(value: string | number | boolean, target: string): void;
	setDate(value: string | number | boolean, target: string): void;
	openAlertModal(): void;
}

function DateForm({ form, setDate, setForm, setData, openAlertModal }: Props) {
	const barcode = useSelector(selectBarcode);
	const allowRecommend =
		!barcode.barcode && (form.foodCategoryId < 0 || CategoryData.data[form.foodCategoryId - 1].pogDayCnt < 0);

	const onToggleRecommendDate = () => {
		// CASE 0: 추천 소비기한 사용 불가인 경우
		if (CategoryData.data[form.foodCategoryId - 1].pogDayCnt < 0) return;

		// CASE 1: 추천 소비기한 사용하는 경우
		if (!form.isRecommend) {
			if (barcode.barcode) {
				const pogDayCnt = barcode.pogDaycnt === -1 ? 365 : barcode.pogDaycnt;
				setForm(pre => ({
					...pre,
					startDate: getTodayStr(),
					endDate: getExpireDayStr(pogDayCnt),
					isConsume: true,
					isRecommend: true,
				}));
			} else {
				const endDate = getExpireDayStr(CategoryData.data[form.foodCategoryId - 1].pogDayCnt);
				setForm(pre => ({
					...pre,
					startDate: getTodayStr(),
					endDate,
					isConsume: true,
					isRecommend: true,
				}));
			}
		}
		// CASE 2: 추천 소비기한 사용을 취소하는 경우
		else {
			setData(false, 'isRecommend');
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<div className={`flex items-end ${allowRecommend ? '' : 'opacity-60'}`}>
				<CheckInput
					value={form.isRecommend}
					onToggle={onToggleRecommendDate}
					disabled={allowRecommend}
					className="mt-4 font-bold text-green"
				>
					예측 소비기한 사용
				</CheckInput>
				<button
					type="button"
					onClick={(e: React.MouseEvent) => {
						e.stopPropagation();
						openAlertModal();
					}}
					className="px-1 text-xl text-green"
				>
					<VscQuestion />
				</button>
			</div>

			<span className="mb-2 text-xs text-left text-light/boldStroke dark:text-dark/boldStroke">
				* 등록일 기준으로 연산한 소비기한을 사용합니다.
			</span>

			<Input
				icon="calendar"
				label="제조일자"
				type="date"
				disabled={form.isRecommend}
				value={form.startDate}
				setValue={value => setDate(value, 'startDate')}
				className="flex-initial w-44"
			/>
			<div className="flex items-center justify-between">
				<Input
					icon="calendar"
					label={form.isConsume ? '소비기한' : '유통기한'}
					type="date"
					disabled={form.isRecommend}
					value={form.endDate}
					setValue={value => setDate(value, 'endDate')}
					className="flex-initial w-44"
				/>
				<CheckInput
					disabled={form.isRecommend}
					value={!form.isConsume && !form.isRecommend}
					onToggle={() => setData(!form.isConsume, 'isConsume')}
					className={undefined}
				>
					유통기한 입력
				</CheckInput>
			</div>
		</div>
	);
}

export default DateForm;
