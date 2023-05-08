import React, { useEffect } from 'react';
import { TbCamera } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { getBarcodeData, selectBarcode, useEmptyBarcodeData } from '../store/modules/barcode';
import getStream from '../utils/camera';

// 식품 등록 화면(바코드 인식 화면)
function BarcodeReader() {
	const barcode = useAppSelector(selectBarcode);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
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
			video.srcObject = stream;

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
		};
	}, []);

	useEffect(() => {
		if (barcode.status === 'success') navigate('/');
	}, [barcode.status]);

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

	return (
		<div className="center flex-col w-screen h-screen box-border bg-black overflow-hidden">
			{/* 헤더 */}
			<div className="min-h-[12%] h-[4rem] text-white text-xs flex flex-col justify-end items-center p-5">
				화면 중앙에 바코드를 스캔해주세요
			</div>

			{/* 비디오 공간 */}
			<div className="min-w-full flex-1 relative center">
				<video className="h-full object-cover" autoPlay muted playsInline />
				<div className="absolute top-0 w-full h-full bg-black/20 backdrop-blur-sm" />
				<canvas className="camera-canvas absolute z-1" />
			</div>

			{/* 제어버튼 공간 */}
			<div className="max-w-4xl w-full min-h-[15%] m-4 pb-2 center relative">
				{/* 촬영 버튼 */}
				<button
					type="button"
					onClick={onCapture}
					className="w-20 box-border aspect-square rounded-full border-solid border-[0.5rem] border-white bg-green center"
				>
					<TbCamera className="text-4xl text-white" />
				</button>

				{/* 직접 입력 버튼 */}
				<button
					type="button"
					onClick={onHanWriting}
					className="min-w-[25%] w-20 py-6 m-4 absolute right-0 text-green font-extrabold text-sm"
				>
					직접 입력
				</button>
			</div>
		</div>
	);
}

export default BarcodeReader;
