import instance from '.';
import { UserData } from '../types/UserTypes';
import { getCookie } from '../utils/cookie';

export const SOCIAL_API = '/social';
export const USER_API = '/user';

export function useGetSocial(code: string) {
	return instance.get(`${SOCIAL_API}/${code}`);
}

export function usePutUser(user: UserData) {
	return instance.put(
		USER_API,
		{
			isAlarm: user.isAlarm,
			isCycle: user.isCycle,
			isDark: user.isDark,
			isPurchase: user.isPurchase,
		},
		{
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
		},
	);
}
