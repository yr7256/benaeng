import { BarcodeFormat, DecodeHintType, BrowserMultiFormatReader } from '@zxing/library';
import { useEffect } from 'react';
import { getBarcodeData, resetBarcodeData, useEmptyBarcodeData } from '../store/modules/barcode';
import getStream from '../utils/camera';
import { useAppDispatch } from './useStore';

function useBarcode() {
	const dispatch = useAppDispatch();
	const hints = new Map();
	const formats = [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128];
	hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
	const reader = new BrowserMultiFormatReader(hints);

	// 초기 비디오 설정
	useEffect(() => {
		dispatch(resetBarcodeData);

		const video = document.getElementsByTagName('video')[0];
		const canvas = document.getElementsByTagName('canvas')[0];
		const ctx = canvas.getContext('2d');
		// 이후 스트림 종료 이벤트를 위해 아래의 변수를 저장하여 활용합니다
		let track: MediaStreamTrack | null = null;
		let interval: NodeJS.Timer | null = null;

		async function startCamera() {
			// 먼저 스트림 객체를 받아옵니다
			const stream = await getStream(0);
			if (!stream) return;
			await reader.decodeFromStream(stream, video, result => {
				// TODO: 바코드 요청보내도록 수정
				if (result) console.dir(result.getText());
			});

			// 비디오 시작 시 비디오 크기로 캔버스의 크기를 조절합니다
			video.addEventListener('play', () => {
				const maxSize = Math.min(window.innerWidth, 400);
				const videoSize = Math.min(video.videoHeight, video.videoWidth);

				// 캔버스 설정
				canvas.width = Math.min(videoSize, maxSize) - 32;
				canvas.height = canvas.width / 2;
				canvas.style.transform = `scale(${video.clientHeight / video.videoHeight})`;
			});

			[track] = stream.getVideoTracks();
			// 오토 포커싱을 위한 설정 추가
			const constraints = track.getConstraints();

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (constraints.focusMode) {
				track.applyConstraints({
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					advanced: [{ focusMode: 'continuous' }],
				});
			}

			// 스트림에 따라 캔버스를 업데이트할 수 있도록 인터벌 객체를 선언합니다
			interval = setInterval(() => {
				const dx = -video.videoWidth / 2 + canvas.width / 2;
				const dy = -video.videoHeight / 2 + canvas.height / 2;

				if (!ctx) return;
				ctx.drawImage(video, dx, dy, video.videoWidth, video.videoHeight);
			});
		}

		startCamera();

		return () => {
			if (interval) clearInterval(interval);
			if (track) track.stop();
			video.pause();
		};
	}, []);

	/** 촬영 클릭 함수 */
	const onCapture = () => {
		const canvas = document.getElementsByTagName('canvas')[0];

		const dataURL = canvas.toDataURL('image/jpg');
		dispatch(getBarcodeData(dataURL));
	};

	/** 직접 입력 이동 클릭 함수 */
	const onHanWriting = () => {
		dispatch(useEmptyBarcodeData());
	};

	return [onCapture, onHanWriting];
}

export default useBarcode;
