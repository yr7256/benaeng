import React, { useEffect } from 'react';
import { TbCamera } from 'react-icons/tb';

// 식품 등록 화면(바코드 인식 화면)
function BarcodeReader() {
	useEffect(() => {
		const video = document.getElementsByTagName('video')[0];
		const canvas = document.getElementsByTagName('canvas')[0];
		const ctx = canvas.getContext('2d');
		// 촬영을 위한 캔버스 그리기 인터벌 함수
		let interval: NodeJS.Timer | null = null;

		// 캔버스 설정
		canvas.width = video.offsetWidth - 60;
		canvas.height = canvas.width;

		// 카메라 연결 이벤트
		async function getCamera() {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });

			video.srcObject = stream;

			interval = setInterval(() => {
				if (!ctx) return;
				const dx = -video.videoWidth / 2 + canvas.width / 2;
				const dy = -video.videoHeight / 2 + canvas.width / 2;
				ctx.drawImage(video, dx, dy, video.videoWidth, video.videoHeight);
			});
		}

		getCamera();

		return () => {
			if (interval) clearInterval(interval);
		};
	}, []);

	const onCapture = () => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const a = document.getElementsByTagName('a')[0];
		const data = canvas.toDataURL('image/jpeg');
		a.href = data;
		a.setAttribute('download', 'whataface.jpg');
	};

	return (
		<div className="flex flex-col items-center w-screen h-full box-border bg-black overflow-hidden">
			{/* 헤더 */}
			<div className="min-h-[15%] h-[4rem] text-white text-xs flex flex-col justify-center items-end p-5">
				<a href="." className="text-red">
					다운로드
				</a>
				화면 중앙에 바코드를 스캔해주세요
			</div>

			{/* 비디오 공간 */}
			<video className="flex-1 object-cover" autoPlay />

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
				<button type="button" className="min-w-[25%] w-20 py-6 m-6 absolute right-0 text-green font-extrabold text-sm">
					직접 입력
				</button>
			</div>
			<canvas className="absolute hidden" />
		</div>
	);
}

export default BarcodeReader;
