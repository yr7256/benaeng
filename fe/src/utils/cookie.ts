import { Cookies } from 'react-cookie';

const cookies = new Cookies();

/** 쿠키 설정 */
export const setCookie = (name: string, value: string, option?: any) => {
	return cookies.set(name, value, { ...option });
};

/** 쿠키 가져오기 */
export const getCookie = (name: string) => {
	return cookies.get(name);
};

/** 쿠키 삭제하기 */
export const removeCookie = (name: string) => {
	return cookies.remove(name);
};
