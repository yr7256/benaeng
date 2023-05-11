import getInstance from '.';
import { Response } from '../types';

const FCM_API = '/fcm';

/** [POST] FCM 토큰 전송 */
export default async function sendToken(deviceToken: string): Promise<Response<null>> {
	return getInstance().post(`${FCM_API}`, { deviceToken });
}
