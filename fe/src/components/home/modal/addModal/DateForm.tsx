import moment from 'moment';
import React from 'react';
import { VscQuestion } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { AddFrom } from '../../../../hooks/useAddForm';
import { selectBarcode } from '../../../../store/modules/barcode';
import CheckInput from '../../../common/input/CheckInput';
import Input from '../../../common/input/Input';

interface Props {
	form: AddFrom;
	setData(value: string | number | boolean, target: string): void;
	setDate(value: string | number | boolean, target: string): void;
	openAlertModal(): void;
}

function DateForm({ form, setDate, setData, openAlertModal }: Props) {
	const barcode = useSelector(selectBarcode);

	const onToggleRecommendDate = () => {
		// CASE 0: 추천 소비기한 사용 불가인 경우
		if (!barcode.barcode) return;

		// CASE 1: 추천 소비기한 사용하는 경우
		if (!form.isRecommend) {
			const pogDayCnt = barcode.pogDaycnt === -1 ? 365 : Math.round((barcode.pogDaycnt / 10) * 8);
			const startDate = moment();
			const endDate = startDate.add(pogDayCnt, 'days');
			const dateFormat = 'YYYY-MM-DD';

			setDate(startDate.format(dateFormat), 'startDate');
			setDate(endDate.format(dateFormat), 'endDate');
			setData(true, 'isRecommend');
		}
		// CASE 2: 추천 소비기한 사용을 취소하는 경우
		else {
			setData(false, 'isRecommend');
		}
	};

	return (
		<>
			<div className={`flex items-end ${!barcode.barcode ? 'opacity-60' : ''}`}>
				<CheckInput
					value={form.isRecommend}
					onToggle={onToggleRecommendDate}
					disabled={Boolean(barcode.barcode)}
					className="text-green font-bold mt-4"
				>
					예측 소비기한 사용
				</CheckInput>
				<button
					type="button"
					onClick={(e: React.MouseEvent) => {
						e.stopPropagation();
						openAlertModal();
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
		</>
	);
}

export default DateForm;
