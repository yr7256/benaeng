import React from 'react';
import Camera from '../components/barcodeReader/camera/Camera';
import BackButton from '../components/common/button/BackButton';
import useBarcode from '../hooks/useBarcode';

// 식품 등록 화면(바코드 인식 화면)
function BarcodeReader() {
	const [onHanWriting] = useBarcode();

	return (
		<div className="center flex-col w-screen h-screen box-border bg-black overflow-hidden">
			{/* 헤더 */}
			<div className="min-h-[12%] h-28 w-full text-white text-xs flex justify-between items-end p-4 relative">
				<BackButton className="translate-y-4" />
				<span>등록할 식품의 바코드를 스캔해주세요</span>
				<div className="w-16" />
			</div>

			{/* 비디오 공간 */}
			<Camera />

			{/* 제어버튼 공간 */}
			<div className="max-w-4xl w-full min-h-[12%] m-4 pb-2 center relative">
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
