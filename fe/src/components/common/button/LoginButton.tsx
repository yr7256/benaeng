function LoginButton() {
	return (
		<button
			type="button"
			className="flex flex-row items-center justify-center h-20 w-80 bg-kakao hover:bg-[#AF7B2D] rounded-2xl"
		>
			<img className="w-12 h-12" src="../src/assets/common/kakao.svg" alt="kakao" />
			<p className="ml-12 text-xl">카카오로 시작하기</p>
		</button>
	);
}

export default LoginButton;
