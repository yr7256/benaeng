import { useState, useRef, useEffect } from 'react';
import './slider.css';

/** slider props 타입 */
interface Props {
	count: number;
	total: number;
}

function Slider({ count, total }: Props) {
	// props로 넘겨받은 총 수량, 남은 수량
	const [nowCount, setCount] = useState(String(count));
	const rangeRef = useRef<HTMLInputElement>(null);
	// 처음 렌더링 시, 배경 색 채워주기
	useEffect(() => {
		if (rangeRef.current) {
			rangeRef.current.style.background = `
            linear-gradient(to right, #00C981 0%, #00C981 ${Math.floor(
							(Number(nowCount) / total) * 100,
						)}%, rgb(236, 236, 236) ${Math.floor((Number(nowCount) / total) * 100)}%, rgb(236, 236, 236) 100%)
                `;
		}
	}, []);
	/** 수량 변경 이벤트 */
	const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const event = e.target;
		if (Number(event.value) > total || Number(event.value) < 0) {
			if (rangeRef.current) {
				rangeRef.current.style.background = `
				linear-gradient(to right, #00C981 0%, rgb(236, 236, 236) 0%)
				`;
			}
			setCount('0');
			window.alert('범위를 벗어난 숫자입니다 🚨');
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
		<div className="flex items-center justify-between w-full">
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
				className="w-12 h-8 text-xs text-center text-black border-2 rounded-lg bg-light/background stroke"
				type="number"
				min={0}
				max={total}
				value={nowCount}
				onChange={handleCount}
			/>
		</div>
	);
}

export default Slider;
