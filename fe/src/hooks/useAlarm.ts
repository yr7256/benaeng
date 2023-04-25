/** 알림 메시지 & 링크 */
function useAlarm(type: number, food: string, day: number, id: number) {
	let msg = '';
	let link = '';

	if (type === 0) {
		msg = `슬슬 ${food}을(를) 구매해야 할 시기에요`;
		link = `https://www.coupang.com/np/search?component=&q=${food}&channel=user`;
	} else if (type === 1) {
		msg = `${food}의 소비기한이 ${day}일 남았어요`;
		link = `/FoodDetail/${id}`;
	} else {
		msg = `${food}의 소비기한이 끝났어요!😭`;
		link = `/FoodDetail/${id}`;
	}

	return { msg, link };
}

export default useAlarm;
