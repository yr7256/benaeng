import getInstance from '.';
import { Response } from '../types';

// const FCM_API = '/fcm';
const TEST = '/test';

/** [POST] FCM 토큰 전송 */
// export default function sendToken(deviceToken: string) {
// 	return getInstance().post<Response<null>>(`${FCM_API}`, { deviceToken });
// }

export function sendToken() {
	return getInstance().post<Response<null>>(`${TEST}`);
}

export function apiGetTest() {
	return getInstance().get<Response<null>>(`${TEST}`);
}
