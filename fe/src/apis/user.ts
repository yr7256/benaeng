import getInstance, { getInstanceWithoutAuth } from '.';
import { UserData } from '../types/UserTypes';

export const SOCIAL_API = '/social';
export const USER_API = '/user';

export function useGetSocial(code: string) {
	return getInstanceWithoutAuth().get(`${SOCIAL_API}/${code}`);
}

export function usePutUser(user: UserData) {
	return getInstance().put(USER_API, {
		isAlarm: user.isAlarm,
		isCycle: user.isCycle,
		isDark: user.isDark,
		isPurchase: user.isPurchase,
	});
}

/** [GET] cookie 내 token을 통한 사용자정보 요청 */
export function getUserData() {
	return getInstance().get(`${USER_API}`, { timeout: 400 });
}
