import getInstance from '.';
import { AlarmData, Response } from '../types';

export const ALARM_API = '/alarm';

/** [GET] 식품별 분석 조회 */
function getAlarm() {
	return getInstance().get<Response<AlarmData[]>>(`${ALARM_API}`);
}

export default getAlarm;
