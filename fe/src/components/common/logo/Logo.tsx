/** logo props 타입 */
interface Props {
	type: number;
}

function Logo({ type }: Props) {
	// type에 따른 logo 스타일 변경
	let boxStyle = 'w-32 h-32 rounded-8 animate-wiggle';
	let imgStyle = 'w-20 h-22';
	if (type === 1) {
		boxStyle = 'w-10 h-10 rounded-8';
		imgStyle = 'w-6 h-7';
	}

	/** logo 클릭 이벤트 */
	const handleLogo = () => {
		window.location.href = '/';
	};
	return (
		<button type="button" className={`flex items-center ${boxStyle} bg-green cursor-pointer`} onClick={handleLogo}>
			<img className={`block m-auto ${imgStyle}`} src="../src/assets/common/logo.svg" alt="logo" />
		</button>
	);
}

export default Logo;
