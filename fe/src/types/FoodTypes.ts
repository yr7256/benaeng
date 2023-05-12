/** 카테고리(중·소분류) */
export interface CategoryData {
	foodCategoryId: number;
	category: string;
	subCategory: string;
}

/** 식품 전제목록 Response */
export interface FoodData {
	foodId: number;
	foodName: string;
	foodCategoryId: number;
	startDate: string;
	endDate: string;
	totalCount: number | '';
	count: number;
}
export interface HomeFoodData extends FoodData {
	category: string;
	subCategory: string;
	dDay: number;
}
export interface Refrigerator {
	[category: string]: HomeFoodData[];
}

/** 식품 상세조회 Response */
export interface NutrientData {
	id: number;
	totalContents: number;
	calories: number;
	carbohydrates: number;
	cholesterol: number;
	fat: number;
	protein: number;
	saturatedFattyAcids: number;
	sodium: number;
	sugars: number;
	transFat: number;
	foodName: string;
}

export interface FoodDetailData {
	foodId: number;
	foodCategoryId: number;
	middleCategory: string;
	subCategory: string;
	foodName: string;
	total: number;
	count: number;
	startDate: string;
	endDate: string;
	nutrientInfo: NutrientData | null;
	purchase: number;
	percent: number;
	msg: string[] | null;
	cycle: number;
	preferProducts: string[] | null;
}

export type enameType =
	| 'carbohydrates'
	| 'protein'
	| 'cholesterol'
	| 'fat'
	| 'saturatedFattyAcids'
	| 'sodium'
	| 'sugars'
	| 'transFat';

/** 식품 영양정보 */
export interface UtrientInfoData {
	ename: enameType;
	kname: string;
	point: string;
	aver: number;
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
