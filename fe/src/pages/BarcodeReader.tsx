import React, { useEffect } from 'react';
import { TbCamera } from 'react-icons/tb';

// 식품 등록 화면(바코드 인식 화면)
function BarcodeReader() {
	useEffect(() => {
		async function getCamera() {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			const video = document.getElementById('video');
			if (video instanceof HTMLVideoElement) {
				video.srcObject = stream;
				video.play();
			}
		}

		getCamera();
	}, []);

	return (
		<div className="flex flex-col items-center h-full bg-black">
			{/* 헤더 */}
			<div className="min-h-[15%] h-[4rem] text-white text-xs flex justify-center items-end p-5">
				화면 중앙에 바코드를 스캔해주세요
			</div>

			{/* 비디오 공간 */}
			<video className="flex-1 object-cover" id="video" />

			{/* 제어버튼 공간 */}
			<div className="max-w-4xl w-full min-h-[15%] m-4 pb-2 center relative">
				{/* 촬영 버튼 */}
				<button
					type="button"
					className="w-20 box-border aspect-square rounded-full border-solid border-[0.5rem] border-white bg-green center"
				>
					<TbCamera className="text-4xl text-white" />
				</button>

				{/* 직접 입력 버튼 */}
				<button type="button" className="min-w-[25%] w-20 py-6 m-6 absolute right-0 text-green font-extrabold text-sm">
					직접 입력
				</button>
			</div>
		</div>
	);
}

export default BarcodeReader;
