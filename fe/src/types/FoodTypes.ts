/** 식품 전제목록 Requset */
export interface FoodRequest {
	category: string;
	subCategory: string;
	name: string;
	count: number | '';
	manufacturingDate: string;
	expirationDate: string;
}

/** 식품 전제목록 Response */
export interface FoodData {
	my_food_id: number;
	sub_category: string;
	name: string;
	d_day: number;
	category: string;
}
export interface MyFoodResponse {
	my_foods: FoodData[];
}

/** 식품 상세조회 Response */
export interface FoodDetailResponse {
	category: string;
	food_category_id: number;
	sub_category: string;
	name: string;
	quantity: string;
	manufacturing_date: string;
	expiration_date: string;
}
