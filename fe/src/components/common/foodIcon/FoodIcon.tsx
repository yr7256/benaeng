import React, { useMemo } from 'react';

/** food icon props 타입 */
interface Props {
	food: string;
	size: 'sm' | 'mid' | 'lg';
}

function FoodIcon({ food, size }: Props) {
	const iconSize = useMemo(() => {
		switch (size) {
			case 'sm':
				return 'w-6 h-6';
			case 'mid':
				return 'w-10 h-10';
			case 'lg':
				return 'w-16 h-16';
			default:
				return '';
		}
	}, [size]);
	const imgSize = useMemo(() => {
		switch (size) {
			case 'sm':
				return 'w-4 h-4';
			case 'mid':
				return 'w-7 h-7';
			case 'lg':
				return 'w-10 h-10';
			default:
				return '';
		}
	}, [size]);
	return (
		<div className={`flex justify-center ${iconSize} rounded-lg bg-skyBlue`}>
			<img className={`block ${imgSize} m-auto`} src={`/assets/food/${food}.svg`} alt="milk" />
		</div>
	);
}

export default FoodIcon;
