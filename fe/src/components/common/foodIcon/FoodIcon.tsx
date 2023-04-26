/** food icon props 타입 */
interface Props {
	food: string;
}

function FoodIcon({ food }: Props) {
	return (
		<div className="flex justify-center w-16 h-16 rounded-lg bg-skyBlue">
			<img className="block w-10 h-10 m-auto" src={`../src/assets/food/${food}.svg`} alt="milk" />
		</div>
	);
}

export default FoodIcon;
