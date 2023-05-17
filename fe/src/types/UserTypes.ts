export interface UserResponse {
	accessToken: string;
	isAlarm: boolean;
	isCycle: boolean;
	isDark: boolean;
	isPurchase: boolean;
	newAlarm: boolean;
}

export interface SocialResponse {
	data: UserResponse;
}

export interface UserData {
	isAlarm: boolean;
	isCycle: boolean;
	isDark: boolean;
	isPurchase: boolean;
}
