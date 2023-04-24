export interface BarcodeResponse {
	category: string;
	sub_category: string;
	name: string;
	recommended_exp_date: string;
}

export interface BarcodeRequest {
	image: string; // 파일? url?
}
