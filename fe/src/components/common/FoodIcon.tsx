function FoodIcon() {
	// props로 음식 이름 받기
	const food = 'milk';
	return (
		<div className="w-16 h-16 bg-skyBlue rounded-lg flex justify-center">
			<img className="w-10 h-10 block m-auto" src={`../src/assets/food/${food}.svg`} alt="milk" />
		</div>
	);
}

export default FoodIcon;
