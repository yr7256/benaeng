import getInstance from '.';
import { AddFrom } from '../components/home/modal/AddModal';
import { CategoryData, FoodDetailData, Response } from '../types';
import { MonthlyReportData } from '../types/AnalysisTypes';
import { FoodData, BarcodeData } from '../types/index';

export const FOOD_API = 'foods';

/** [POST] 바코드 인식 */
export function postFoodBarcode(image: File) {
	const formData = new FormData();
	formData.append('multipartFile', image);

	return getInstance().post<Response<BarcodeData>>(`${FOOD_API}/barcode`, formData, {
		headers: { 'Content-Type': 'multipart/form' },
	});
}

/** [POST] 식품 등록 */
export function postFood(food: AddFrom) {
	const { foodName, foodCategoryId, totalCount, isRecommend, isConsume, startDate, endDate } = food;
	const data = { foodName, foodCategoryId, totalCount, isRecommend, isConsume, startDate, endDate };
	return getInstance().post<Response<null>>(`${FOOD_API}`, data);
}

/** [GET] 등록한 식품의 카테고리 목록 조회 */
export function getFoodCategory() {
	return getInstance().get<Response<CategoryData[]>>(`${FOOD_API}/category`);
}

/** [GET] 등록한 식품 목록 조회 */
export function getFoodList() {
	return getInstance().get<Response<FoodData[]>>(`${FOOD_API}`);
}

/** [GET] 등록한 식품 상세 조회 */
export function getFood(foodId: number) {
	return getInstance().get<Response<FoodDetailData>>(`${FOOD_API}/moreInfo/${foodId}`);
}

/** [PUT] 등록한 식품 수량 변경 */
export function putFoodCount(myFoodId: number, count: number) {
	return getInstance().put<Response<null>>(`${FOOD_API}`, { myFoodId, count });
}

/** [DELETE] 잘못 등록된 식품 삭제 */
export function deleteFood(foodId: number) {
	return getInstance().delete<Response<null>>(`${FOOD_API}/${foodId}`);
}

/** [GET] 소비기한 임박 식품 목록 */
export function getFoodImpending() {
	return getInstance().get<Response<null>>(`${FOOD_API}/impending`);
}

/** [GET] 소비기한 만료식품 목록 */
export function getFoodExpiration() {
	return getInstance().get<Response<null>>(`${FOOD_API}/expiration`);
}

/** [POST] 등록한 식품 완전 소비 */
export function postFoodUsed(myFoodId: number) {
	const status = 1;
	return getInstance().post<Response<null>>(`${FOOD_API}/state`, { myFoodId, status });
}

/** [POST] 등록한 식품 폐기 */
export function postFoodExpire(myFoodId: number) {
	const status = 0;
	return getInstance().post<Response<null>>(`${FOOD_API}/state`, { myFoodId, status });
}

/** [GET] 월간 데이터 분석 조회 */
export function getFoodFoodDataMonth(year: number, month: number) {
	return getInstance().get<Response<MonthlyReportData>>(`${FOOD_API}/foodData/month/${year}/${month}`);
}
