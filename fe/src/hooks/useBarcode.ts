import { useQuery } from '@tanstack/react-query';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { resetBarcodeData, useEmptyBarcodeData, getBarcodeData, selectBarcode } from '../store/modules/barcode';
import getStream from '../utils/camera';
import { useAppDispatch, useAppSelector } from './useStore';

declare global {
	interface MediaTrackConstraintSet {
		focusMode?: 'continuous' | 'single-shot' | 'manual' | 'none';
	}
}

function useBarcode(): [() => void, (string: string) => void] {
	const barcode = useAppSelector(selectBarcode);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [code, setCode] = useState<string>('');
	useQuery(['barcode', code], () => dispatch(getBarcodeData(code)), {
		enabled: Boolean(code),
	});

	// 바코드 인식 결과에 따른 처리 로직
	useEffect(() => {
		if (barcode.status === 'success') navigate('/');
		if (barcode.status === 'fail') setCode('');
	}, [barcode.status]);

	// 초기 비디오 설정
	useEffect(() => {
		dispatch(resetBarcodeData);

		const video = document.getElementsByTagName('video')[0];
		const canvas = document.getElementsByTagName('canvas')[0];
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		// 스트림 종료를 위해 트랙정보를 저장합니다
		let track: MediaStreamTrack | null = null;
		// 이후 스트림 종료 이벤트를 위해 아래의 변수를 저장하여 활용합니다
		let interval: NodeJS.Timer | null = null;
		let readerControls: IScannerControls | null = null;

		async function startCamera() {
			// 먼저 스트림 객체를 받아옵니다
			const stream = await getStream(0);
			if (!stream) return;
			video.srcObject = stream;

			// 오토 포커싱을 위한 설정 추가합니다
			[track] = stream.getVideoTracks();
			const constraints = track.getConstraints();

			if (constraints.focusMode) {
				track.applyConstraints({
					advanced: [{ focusMode: 'continuous' }],
				});
			}

			// 스트림에 따라 캔버스를 업데이트할 수 있도록 인터벌 객체를 선언합니다
			interval = setInterval(() => {
				const size = video.clientHeight / video.videoHeight;
				const width = video.videoWidth * size;
				const height = video.videoHeight * size;
				const dx = -width / 2 + canvas.width / 2;
				const dy = -height / 2 + canvas.height / 2;

				if (!ctx) return;
				ctx.drawImage(video, dx, dy, width, height);
			});

			// zxing를 이용한 바코드인식 이벤트 등록
			const hints = new Map();
			const formats = [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128];
			hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
			const reader = new BrowserMultiFormatReader(hints);

			readerControls = await reader.decodeFromVideoElement(video, result => {
				if (result) {
					const newCode = result.getText();
					console.log(newCode);
					if (code === newCode) return;
					if (barcode.status === 'loading') return;
					setCode(newCode);
				}
			});
		}

		startCamera();

		return () => {
			if (readerControls) readerControls.stop();
			if (interval) clearInterval(interval);
			if (track) track.stop();
			video.pause();
		};
	}, []);

	/** 직접 입력 이동 클릭 함수 */
	const onHanWriting = () => {
		dispatch(useEmptyBarcodeData());
	};

	const onSubmitBarcode = (string: string) => {
		setCode(string);
	};

	return [onHanWriting, onSubmitBarcode];
}

export default useBarcode;
