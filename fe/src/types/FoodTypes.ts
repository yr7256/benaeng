export interface FoodRequest {
	category: string;
	sub_category: string;
	name: string;
	quantity: number;
	manufacturing_date: string;
	expiration_date: string;
}

export interface FoodResponse {
	my_food_id: number;
	sub_category: string;
	name: string;
	d_day: number;
	category: string;
}
