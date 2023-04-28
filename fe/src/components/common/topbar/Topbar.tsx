import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// 식품 등록 화면(바코드 인식 화면)

function Topbar() {
	const path = useLocation().pathname;
	let displayText = '';

	if (path.includes('analysis')) {
		displayText = '소비패턴 분석';
	} else if (path.includes('setting')) {
		displayText = '설정';
	} else if (path.includes('foods')) {
		displayText = '식품 상세';
	}

	return (
		<div className="text mb-10">
			<div className="flex items-center text">
				<Link to="/">
					<img className="block dark:hidden" src="/assets/light/back-btn.svg" alt="back" />
					<img className="hidden dark:block" src="/assets/dark/back-btn.svg" alt="back" />
				</Link>
				<p className="text-2xl">{displayText}</p>
			</div>
		</div>
	);
}

export default Topbar;
