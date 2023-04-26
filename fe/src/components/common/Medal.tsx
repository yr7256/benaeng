interface MedalProps {
	medal: string;
}

function Medal({ medal }: MedalProps) {
	// props로 메달 이름 받기
	return <img src={`../src/assets/common/${medal}.svg`} alt="medal" />;
}

export default Medal;
