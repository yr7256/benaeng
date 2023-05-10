import { useQuery } from '@tanstack/react-query';
import { BarcodeFormat, DecodeHintType, BrowserMultiFormatReader } from '@zxing/library';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { resetBarcodeData, useEmptyBarcodeData, getBarcodeData, selectBarcode } from '../store/modules/barcode';
import getStream from '../utils/camera';
import { useAppDispatch, useAppSelector } from './useStore';

function useBarcode() {
	const barcode = useAppSelector(selectBarcode);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [code, setCode] = useState<string>('');
	useQuery(['barcode', code], () => dispatch(getBarcodeData(code)), {
		enabled: Boolean(code),
	});

	const hints = new Map();
	const formats = [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_128];
	hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
	const reader = new BrowserMultiFormatReader(hints);

	useEffect(() => {
		if (barcode.status === 'success') navigate('/');
		if (barcode.status === 'fail') setCode('');
	}, [barcode.status]);

	// 초기 비디오 설정
	useEffect(() => {
		dispatch(resetBarcodeData);

		const video = document.getElementsByTagName('video')[0];
		// 이후 스트림 종료 이벤트를 위해 아래의 변수를 저장하여 활용합니다
		let track: MediaStreamTrack | null = null;

		async function startCamera() {
			// 먼저 스트림 객체를 받아옵니다
			const stream = await getStream(0);
			if (!stream) return;
			await reader.decodeFromStream(stream, video, result => {
				if (result) {
					const newCode = result.getText();
					if (code === newCode) return;
					// if (barcodeQuery.isLoading) return;
					setCode(newCode);
				}
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
		}

		startCamera();

		return () => {
			if (track) track.stop();
			video.pause();
		};
	}, []);

	/** 직접 입력 이동 클릭 함수 */
	const onHanWriting = () => {
		dispatch(useEmptyBarcodeData());
	};

	return [onHanWriting];
}

export default useBarcode;
