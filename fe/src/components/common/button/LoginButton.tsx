import { REDIRECT_URI, REST_API_KEY } from '../../../constants/api';

function LoginButton() {
	/** 카카오 로그인 */
	const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URI;
	};

	return (
		<button
			type="button"
			className="flex flex-row items-center justify-center h-20 w-80 bg-kakao hover:bg-[#AF7B2D] rounded-2xl"
			onClick={handleLogin}
		>
			<img className="w-12 h-12" src="/assets/common/kakao.svg" alt="kakao" />
			<p className="ml-12 text-xl">카카오로 시작하기</p>
		</button>
	);
}

export default LoginButton;
