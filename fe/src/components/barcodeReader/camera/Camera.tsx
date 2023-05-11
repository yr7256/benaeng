import React from 'react';
import './Camera.css';

function Camera() {
	const size = Math.min(400, Math.min(window.innerWidth, window.innerHeight)) - 48;

	return (
		<div className="min-w-full flex-1 relative center">
			<div className="absolute z-20 center flex-col">
				<img alt="바코드 이미지" src="assets/common/barcode.svg" className="p-2 mt-[32px]" />
				<canvas width={size} height={size} className="rounded-lg border-2 border-green" />
				<button type="button" className="bg-green text-white rounded-lg h-10 mt-[32px] px-6 text-sm font-bold">
					바코드 직접 입력
				</button>
			</div>
			<div className="absolute z-10 top-0 w-full h-full bg-black/60" />
			<video className="h-full object-cover" autoPlay muted playsInline />
		</div>
	);
}

export default Camera;
