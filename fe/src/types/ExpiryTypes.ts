/** 소비기한 임박/만료 식품 목록 Response */
export interface ExpiryData {
	my_food_id: number;
	sub_category: string;
	name: string;
	d_day: number;
}
export interface ExpiryResponse {
	my_foods: ExpiryData[];
}

/** 식품 소비/폐기 Request */
export interface FoodPutRequest {
	my_food_id: number;
	status: number;
}
