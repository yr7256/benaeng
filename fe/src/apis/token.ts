import instance from '.';
import { Response } from '../types';

const FCM_API = 'fcm';

/** [POST] FCM 토큰 전송 */
export default function sendToken(deviceToken: string) {
	return instance.post<Response<null>>(`${FCM_API}`, { deviceToken });
}
