/** 바코드 인식 Response */
export interface BarcodeResponse {
	category: string;
	sub_category: string;
	name: string;
	recommended_exp_date: string;
}

/** 바코드 인식 Request */
export interface BarcodeRequest {
	image: string; // 파일? url?
}
