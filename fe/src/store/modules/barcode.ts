import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFoodBarcode } from '../../apis/foods';
import { RootState } from '../store';

export interface BarcodeState {
	status: 'default' | 'loading' | 'success' | 'fail';
	barcode: string | null;
	foodName: string;
	foodCategoryId: number;
	pogDaycnt: number;
}

const initialState: BarcodeState = {
	status: 'default',
	barcode: null,
	foodCategoryId: -1,
	foodName: '',
	pogDaycnt: -1,
};

// 바코드 사진을 통한 정보 요청 함수
export const getBarcodeData = createAsyncThunk('barcode/getBarcodeData', async (code: string) => {
	// dataURL 형태의 이미지를 file로 변환합니다

	// 변환된 file을 통해 요청을 보냅니다
	const { data } = await getFoodBarcode(code);

	// 요청 처리 실패인 경우
	if (data.resultCode === '400') {
		const barcode: BarcodeState = { ...initialState, status: 'fail' };
		return JSON.stringify(barcode);
	}
	// 유효하지 않은 바코드인 경우
	if (data.resultCode === '204') {
		const barcode: BarcodeState = { ...initialState, status: 'fail' };
		return JSON.stringify(barcode);
	}
	// 유효한 바코드인 경우
	if (data.resultCode === '200') {
		const barcode: BarcodeState = {
			status: 'success',
			barcode: code,
			foodCategoryId: data.data.foodCategoryId,
			foodName: data.data.foodName,
			pogDaycnt: data.data.pogDaycnt,
		};
		return JSON.stringify(barcode);
	}
	return '';
});

export const barcodeSlice = createSlice({
	name: 'barcode',
	initialState,
	reducers: {
		resetBarcodeData: state => {
			const temp = state;
			temp.status = 'default';
			temp.barcode = null;
			temp.foodCategoryId = -1;
			temp.foodName = '';
			temp.pogDaycnt = -1;
		},
		useEmptyBarcodeData: state => {
			const temp = state;
			temp.status = 'success';
			temp.barcode = null;
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<BarcodeState>) => {
		// pending
		builder.addCase(getBarcodeData.pending, state => {
			const temp = state;
			temp.status = 'loading';
		});
		// fullfilled
		builder.addCase(getBarcodeData.fulfilled, (state, { payload }) => {
			const { status, barcode, foodCategoryId, foodName, pogDaycnt } = JSON.parse(payload);
			const temp = state;
			temp.status = status;
			temp.barcode = barcode;
			temp.foodCategoryId = foodCategoryId;
			temp.foodName = foodName;
			temp.pogDaycnt = pogDaycnt;
		});
		// rejected
		builder.addCase(getBarcodeData.rejected, state => {
			const temp = state;
			temp.status = 'fail';
			temp.barcode = null;
		});
	},
});

export const { resetBarcodeData, useEmptyBarcodeData } = barcodeSlice.actions;
export const selectBarcode = (state: RootState) => state.barcode;
export default barcodeSlice.reducer;
