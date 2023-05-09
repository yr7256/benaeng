import getInstance from '.';
import { UserData } from '../types/UserTypes';

export const SOCIAL_API = '/social';
export const USER_API = '/user';

export function useGetSocial(code: string) {
	return getInstance().get(`${SOCIAL_API}/${code}`);
}

export function usePutUser(user: UserData) {
	return getInstance().put(USER_API, {
		isAlarm: user.isAlarm,
		isCycle: user.isCycle,
		isDark: user.isDark,
		isPurchase: user.isPurchase,
	});
}
