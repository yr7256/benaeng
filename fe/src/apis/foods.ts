import moment from 'moment';
import getInstance from '.';
import { AddFrom } from '../hooks/useAddForm';
import { CategoryData, FoodDetailData, FoodReportData, Response } from '../types';
import { MonthlyReportData, CalendarData } from '../types/AnalysisTypes';
import { FoodData, BarcodeData } from '../types/index';

export const FOOD_API = 'foods';

/** [GET] 바코드 인식 */
export function getFoodBarcode(barcode: string) {
	return getInstance().get<Response<BarcodeData>>(`${FOOD_API}/foodData/${barcode}`);
}

/** [POST] 식품 등록 */
export function postFood(food: AddFrom) {
	const { foodName, foodCategoryId, isRecommend, isConsume, endDate } = food;
	let { totalCount, startDate } = food;
	if (totalCount === 1) totalCount = -1;
	if (!startDate) startDate = moment().format('YYYY-MM-DD');
	const data = { foodName, foodCategoryId, totalCount, isRecommend, isConsume, startDate, endDate };
	return getInstance().post<Response<null>>(`${FOOD_API}/regist`, data);
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

/** [GET] 냉장고 캘린더의 데이터 조회 (구매 기록, 구매 주기, 슬슬 구매한 항목, 오늘 구매한 항목) */
export function getCalendarData() {
	return getInstance().get<Response<CalendarData>>(`${FOOD_API}/fooddata/calendar`);
}

/** [GET] 식품별 분석 조회 */
export function getFoodFoodDataDetail(foodCategoryId: number) {
	return getInstance().get<Response<FoodReportData>>(`${FOOD_API}/foodDataDetail/${foodCategoryId}`);
}

/** [GET] 냉장고 초기화 */
export function getFoodInit() {
	return getInstance().delete<Response<null>>(`${FOOD_API}/init`);
}
