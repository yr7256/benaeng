import instance from '.';
import { CategoryData, FoodDetailData, Response } from '../types';
import { FoodData, BarcodeData } from '../types/index';

const FOOD_API = 'foods';

/** [POST] 바코드 인식 */
export function postFoodBarcode(image: File) {
	return instance.post<Response<BarcodeData>>(
		`${FOOD_API}/barcode`,
		{ image },
		{ headers: { 'Content-Type': 'multipart/form' } },
	);
}

/** [POST] 식품 등록 */
export function postFood(food: FoodData) {
	return instance.post<Response<null>>(`${FOOD_API}`, food);
}

/** [GET] 등록한 식품의 카테고리 목록 조회 */
export function getFoodCategory() {
	return instance.get<Response<FoodData[]>>(`${FOOD_API}/category`);
}

/** [GET] 등록한 식품 목록 조회 */
export function getFoodList() {
	return instance.get<Response<CategoryData[]>>(`${FOOD_API}`);
}

/** [GET] 등록한 식품 상세 조회 */
export function getFood(foodId: number) {
	return instance.get<Response<FoodDetailData>>(`${FOOD_API}/moreInfo/${foodId}`);
}

/** [PUT] 등록한 식품 수량 변경 */
export function putFoodCount(myfoodId: number, count: number) {
	return instance.put<Response<null>>(`${FOOD_API}`, { myfoodId, count });
}

/** [DELETE] 잘못 등록된 식품 삭제 */
export function deleteFood(foodId: number) {
	return instance.delete<Response<null>>(`${FOOD_API}/${foodId}`);
}

/** [GET] 소비기한 임박 식품 목록 */
export function getFoodImpending() {
	return instance.get<Response<null>>(`${FOOD_API}/impending`);
}

/** [GET] 소비기한 만료식품 목록 */
export function getFoodExpiration() {
	return instance.get<Response<null>>(`${FOOD_API}/expiration`);
}

/** [POST] 등록한 식품 완전 소비 */
export function postFoodUsed(myFoodId: number) {
	const status = 1;
	return instance.post<Response<null>>(`${FOOD_API}/state`, { myFoodId, status });
}

/** [POST] 등록한 식품 폐기 */
export function postFoodExpire(myFoodId: number) {
	const status = 0;
	return instance.post<Response<null>>(`${FOOD_API}/state`, { myFoodId, status });
}
