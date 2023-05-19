import getInstance from '.';
import { AlarmData, Response } from '../types';

export const ALARM_API = '/alarm';

/** [GET] 알람 목록 조회 */
export function getAlarm() {
	return getInstance().get<Response<AlarmData[]>>(`${ALARM_API}`);
}

/** [PUT] 알람 읽음 처리 */
export function putAlarm() {
	return getInstance().put<Response<null>>(`${ALARM_API}`);
}
