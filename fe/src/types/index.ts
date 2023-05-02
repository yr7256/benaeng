export interface Response<T> {
	resultCode: string;
	message: string;
	data: T;
}

export * from './BarcodeTypes';
export * from './ExpiryTypes';
export * from './FoodTypes';
