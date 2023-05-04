import React, { useEffect, useState } from 'react';
import { TbCamera } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import Modal from '../components/common/modal/Modal';

// 식품 등록 화면(바코드 인식 화면)
function BarcodeReader() {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const video = document.getElementsByTagName('video')[0];
		const canvas = document.getElementsByTagName('canvas')[0];
		const ctx = canvas.getContext('2d');
		let interval: NodeJS.Timer | null = null;

		// STEP 1: 사용자에게 카메라 권한 요청
		// CASE 1-1: 카메라 접근 권한 수락
		// 장치 리스트 정보를 가져옵니다

		// CASE 1-2: 카메라 접근 권한 거절
		// 카메라 기능을 사용하기 위해서는 권한을 허용해야함을 알리고 default 화면을 보여줍니다
		// RETURN

		// STEP 2: 카메라 객체 선택
		// CASE 2-1: 후면 & focusMode 지원 카메라가 있는 경우
		// CASE 2-2: 후면 카메라가 있는 경우
		// CASE 2-3: focusMode 지원 카메라가 있는 경우
		// CASE 2-4: 카메라가 있는 경우
		// 해당 카메라 중 1번째를 선택합니다

		// CASE DEFAULT: 카메라가 없는 경우
		// 카메라 기능을 사용하기 위해서는 카메라가 있어야함을 알리고 default 화면을 보여줍니다
		// RETURN

		// STEP 4: 카메라 재생
		// 이후 종료를 위해 카메라 트랙 정보를 저장합니다

		// STEP 5: 카메라 재생 종료
		// 카메라 트랙을 종료시킵니다

		// 카메라 연결 이벤트
		async function getCamera() {
			const user = navigator.userAgent;
			let setting: MediaStreamConstraints = { video: true };

			// 장치에 따라 가져오는 카메라를 변경
			// 모바일인경우 후면 카메라를 가져옵니다
			if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
				setting = { video: { facingMode: { exact: 'environment' } } };
			}
			const stream = await navigator.mediaDevices.getUserMedia(setting);
			video.srcObject = stream;

			video.addEventListener('play', () => {
				const maxSize = 480;
				const videoSize = Math.min(video.videoHeight, video.videoWidth);

				// 캔버스 설정
				canvas.width = Math.min(videoSize, maxSize) - 32;
				canvas.style.transform = `scale(${video.clientHeight / video.videoHeight})`;
				canvas.height = canvas.width;
			});
			const track = stream.getVideoTracks()[0];
			// 오토 포커싱을 위한 설정 추가

			track.applyConstraints({
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				advanced: [{ focusMode: 'continuous' }],
			});

			interval = setInterval(() => {
				const dx = -video.videoWidth / 2 + canvas.width / 2;
				const dy = -video.videoHeight / 2 + canvas.width / 2;

				if (!ctx) return;
				ctx.drawImage(video, dx, dy, video.videoWidth, video.videoHeight);
			});
		}

		getCamera();

		return () => {
			if (interval) clearInterval(interval);
		};
	}, []);

	/** 촬영 클릭 함수 */
	const onCapture = () => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const result = document.getElementsByTagName('img')[0];

		const data = canvas.toDataURL('image/jpeg');
		result.src = data;
		setOpenModal(true);
	};

	/** 직접 입력 이동 클릭 함수 */
	const onHanWriting = () => {
		navigate('/?barcode=null');
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

			<Modal
				mode="form"
				size="sm"
				label="촬영 결과"
				open={openModal}
				onClose={() => setOpenModal(false)}
				submitText="확인"
				onSubmit={() => setOpenModal(false)}
			>
				<img alt="result" />
			</Modal>
		</div>
	);
}

export default BarcodeReader;
