import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postFoodBarcode } from '../../apis/foods';
import { RootState } from '../store';

export interface BarcodeState {
	status: 'default' | 'loading' | 'success' | 'fail';
	barcode: string | null;
	foodName: string;
	foodCategoryId: number;
	foodId: number;
	pogDaycnt: number;
}

const initialState: BarcodeState = {
	status: 'default',
	barcode: null,
	foodCategoryId: -1,
	foodId: -1,
	foodName: '',
	pogDaycnt: -1,
};

// 바코드 사진을 통한 정보 요청 함수
export const getBarcodeData = createAsyncThunk('barcode/getBarcodeData', async (dataURL: string) => {
	// dataURL 형태의 이미지를 file로 변환합니다
	const blobBin = atob(dataURL.split(',')[1]);
	const array: number[] = [];
	blobBin.split('').forEach(chr => array.push(chr.charCodeAt(0)));

	const blob = new Blob([new Uint8Array(array)], { type: 'image/jpg' });
	const file = new File([blob], 'image.jpg');

	// 변환된 file을 통해 요청을 보냅니다
	const { data } = await postFoodBarcode(file);

	// 유효하지 않은 바코드인 경우
	if (data.resultCode === '400') {
		const barcode: BarcodeState = { ...initialState, status: 'fail' };
		return JSON.stringify(barcode);
	}
	// 유효한 바코드인 경우
	if (data.resultCode === '200') {
		const barcode: BarcodeState = {
			status: 'success',
			barcode: data.data.barcode,
			foodCategoryId: data.data.foodCategory.id,
			foodId: data.data.id,
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
			temp.foodId = -1;
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
			const { status, barcode, foodCategoryId, foodId, foodName, pogDaycnt } = JSON.parse(payload);

			const temp = state;
			temp.status = status;
			temp.barcode = barcode;
			temp.foodCategoryId = foodCategoryId;
			temp.foodId = foodId;
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
