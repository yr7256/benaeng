/** 카테고리(중·소분류) */
export interface Category {
	id: number;
	category: string;
	subCategory: string;
}

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

/** 식품 영양정보 */
export interface UtrientInfoData {
	carbohydrate: string;
	protein: string;
	cholesterol: string;
	fat: string;
	saturatedFattyAcids: string;
	sodium: string;
	sugars: string;
	transFat: string;
}

/** 알림메시지 */
export interface AlarmData {
	id: number;
	name: string;
	type: number;
	subCategory: string;
	status: number;
	date: string;
	dDay: number;
}
