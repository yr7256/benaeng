/** 비디오 스트림 반환 함수 */
export default async function getStream(order: number): Promise<MediaStream | null> {
	// 미디어 제어가 불가능한 경우
	if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
		const error = new Error('getUserMedia 함수를 사용할 수 없습니다.');
		error.name = 'UserMediaError';
		throw error;
	}

	const devices = await navigator.mediaDevices.enumerateDevices();
	const camera = devices.filter(device => device.kind === 'videoinput');

	// order별 시도할 setting 단계
	// order가 높을수록 우선순위가 높은 카메라입니다
	const setting = [
		{
			video: {
				deviceId: camera.length ? camera[camera.length - 1] : null,
				facingMode: { exact: 'environment' },
				focusMode: { ideal: 'continuous' },
				zoom: { ideal: 1 },
			},
		},
		{
			video: {
				deviceId: camera.length ? camera[camera.length - 1] : null,
				facingMode: { exact: 'environment' },
			},
		},
		{
			video: {
				deviceId: camera.length ? camera[camera.length - 1] : null,
				focusMode: { ideal: 'continuous' },
				zoom: { ideal: 1 },
			},
		},
		{ video: true },
	];

	try {
		// CASE 1: 카메라 접근 권한 수락
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const stream = await navigator.mediaDevices.getUserMedia(setting[order]);
		return stream;
	} catch (e) {
		// CASE 2: 카메라 접근 권한 거절
		if (e instanceof Error && e.name === 'NonAllowedError') {
			const error = new Error('카메라 접근에 실패하였습니다.');
			error.name = 'NonAllowedError';
			throw error;
		}
		// CASE 3: 해당 카메라 없음
		if (e instanceof Error && e.name === 'NotFoundError') {
			if (order === 3) {
				const error = new Error('접근할 수 있는 카메라가 없습니다.');
				error.name = 'NotFoundError';
				throw error;
			}
		}
	}

	try {
		const stream = await getStream(order + 1);
		return stream;
	} catch (e) {
		if (e instanceof Error) throw e;
	}
	return null;
}
