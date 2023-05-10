import React from 'react';
import './Camera.css';

function Camera() {
	// const midWidth = Math.min(420, window.innerWidth) - 48;

	return (
		<div className="min-w-full flex-1 relative center">
			{/* <div className="cover absolute top-0 w-full h-full bg-black" /> */}
			<video className="h-full object-cover" autoPlay muted playsInline />
			{/* <svg id="mask" preserveAspectRatio="none" className="absolute top-0 w-full h-full">
				<rect x={0} y={0} width={midWidth} height={midWidth} rx="8" fill="black" />
			</svg> */}
		</div>
	);
}

export default Camera;
