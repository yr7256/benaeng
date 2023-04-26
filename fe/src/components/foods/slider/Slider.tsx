import { useState, useRef, useEffect } from 'react';
import './slider.css';

function Slider(props: { count: number; total: number }) {
	const { count, total } = props;
	// props로 넘겨받은 총 수량, 남은 수량
	const [nowCount, setCount] = useState(String(count));
	const rangeRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (rangeRef.current) {
			rangeRef.current.style.background = `
            linear-gradient(to right, #00C981 0%, #00C981 ${Math.floor(
							(Number(nowCount) / total) * 100,
						)}%, rgb(236, 236, 236) ${Math.floor((Number(nowCount) / total) * 100)}%, rgb(236, 236, 236) 100%)
                `;
		}
	}, []);
	const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const event = e.target;
		if (Number(event.value) > total || Number(event.value) < 0) {
			window.alert('범위를 벗어난 숫자입니다 🚨');
			setCount('0');
			return;
		}
		setCount(event.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
		if (rangeRef.current) {
			rangeRef.current.style.background = `
            linear-gradient(to right, #00C981 0%, #00C981 ${Math.floor(
							(Number(event.value) / total) * 100,
						)}%, rgb(236, 236, 236) ${Math.floor((Number(event.value) / total) * 100)}%, rgb(236, 236, 236) 100%)
                `;
		}
	};
	return (
		<>
			<input
				ref={rangeRef}
				className="range"
				type="range"
				min={0}
				max={total}
				step={1}
				value={nowCount}
				onChange={handleCount}
			/>
			<input
				id="number"
				className="h-8 ml-4 text-xs text-center border-2 rounded-lg w-14 bg-light/background text-text stroke"
				type="number"
				min={0}
				max={total}
				value={nowCount}
				onChange={handleCount}
			/>
		</>
	);
}

export default Slider;
