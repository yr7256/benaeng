import React, { useEffect } from 'react';
import { TbCamera } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import Toast from '../components/common/toast/Toast';
import useBarcode from '../hooks/useBarcode';
import { useAppSelector } from '../hooks/useStore';
import useToast from '../hooks/useToast';
import { selectBarcode } from '../store/modules/barcode';

// 식품 등록 화면(바코드 인식 화면)
function BarcodeReader() {
	const [messageList, addMessage] = useToast();
	const [onCapture, onHanWriting] = useBarcode();
	const barcode = useAppSelector(selectBarcode);
	const navigate = useNavigate();

	useEffect(() => {
		if (barcode.status === 'success') navigate('/');
		if (barcode.status === 'fail') addMessage('바코드 인식을 실패했습니다');
	}, [barcode.status]);

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
			<Toast messageList={messageList} />
		</div>
	);
}

export default BarcodeReader;
