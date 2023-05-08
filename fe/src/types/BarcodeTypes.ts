/** 바코드 인식 Response */
export interface BarcodeData {
	id: number;
	foodName: string;
	barcode: string;
	pogDaycnt: number;
	foodCategory: {
		id: number;
		middleCategory: string;
		subCategory: string;
	};
}
