// import { useEffect } from 'react';

function LoginButton() {
	// useEffect(() => {
	// 	// 카카오 SDK 초기화
	// 	if (!window.Kakao.isInitialized()) {
	// 		// 초기화 되어있지 않을 경우(중복 초기화 에러 방지)
	// 		window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY); // env 환경변수 사용
	// 		// console.log(window.Kakao.isInitialized()); // 초기화 여부 확인(true 나와야 함)
	// 	}
	// }, []);

	/** 카카오 로그인 */
	// const handleLogin = () => {
	// 	window.Kakao.Auth.authorize({
	// 		redirectUri: process.env.REACT_APP_KAKAO_REDIRECTURI,
	// 	});
	// 	window.location.href = process.env.REACT_APP_LOGIN_REDIRECTURI ? process.env.REACT_APP_LOGIN_REDIRECTURI : '/';
	// };

	return (
		<button
			type="button"
			className="flex flex-row items-center justify-center h-20 w-80 bg-kakao hover:bg-[#AF7B2D] rounded-2xl"
			// onClick={handleLogin}
		>
			<img className="w-12 h-12" src="../src/assets/common/kakao.svg" alt="kakao" />
			<p className="ml-12 text-xl">카카오로 시작하기</p>
		</button>
	);
}

export default LoginButton;
