import React from 'react';
import Logo from '../components/common/logo/Logo';
import LoginButton from '../components/common/button/LoginButton';

// 로그인 화면

function Login() {
	return (
		<div className="w-screen h-screen py-20 page">
			<div className="flex flex-col items-center justify-between h-full m-auto w-88">
				<div className="h-4/5">
					<div className="flex items-center justify-around h-32 mb-16 w-80">
						<Logo type={0} />
						<span className="text-4xl font-bold text-left text-black dark:text-white">
							<span className="text-5xl"> 비</span>워줄게, <br /> <span className="text-5xl"> 냉</span>장고
						</span>
					</div>
					<div className="text-xl font-bold text-light/boldStroke dark:text-dark/boldStroke">
						소비패턴 분석 서비스를 제공받아 <br />
						냉장고 관리를 수월하게 해보세요
					</div>
				</div>
				<div className="h-1/5">
					<LoginButton />
				</div>
			</div>
		</div>
	);
}

export default Login;
