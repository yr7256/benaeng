function LoginButton() {
	return (
		<button className="w-80 h-20 bg-kakao flex flex-row justify-center items-center rounded-2xl">
			<img className="w-12 h-12" src="../src/assets/common/kakao.svg" alt="kakao" />
			<p className="text-xl ml-12">카카오로 시작하기</p>
		</button>
	);
}

export default LoginButton;
