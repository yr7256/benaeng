import { useState, useRef, useEffect, useCallback } from 'react';
import './slider.css';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useParams } from 'react-router';
import { FOOD_API, putFoodCount } from '../../../apis/foods';

/** slider props 타입 */
interface Props {
	count: number;
	total: number;
}

function Slider({ count, total }: Props) {
	const { id } = useParams();
	// props로 넘겨받은 총 수량, 남은 수량
	const [nowTotal, setTotal] = useState(String(total));
	const [nowCount, setCount] = useState(String(count));
	const mutationFoods = useMutation([FOOD_API, Number(id)], (cnt: number) => putFoodCount(Number(id), Number(cnt)));
	const rangeRef = useRef<HTMLInputElement>(null);
	// 처음 렌더링 시, 배경 색 채워주기
	useEffect(() => {
		let initTotal = total;
		let initCount = count;
		let aver = 0;
		if (initCount < 0) {
			setTotal('100');
			setCount('100');
			initTotal = 100;
			initCount = 100;
		}
		if (initTotal < 0) {
			setTotal('100');
			initTotal = 100;
		}
		if (initTotal !== 0) aver = initCount / initTotal;
		if (rangeRef.current) {
			rangeRef.current.style.background = `
            linear-gradient(to right, #00C981 0%, #00C981 ${Math.floor(aver * 100)}%, rgb(236, 236, 236) ${Math.floor(
				aver * 100,
			)}%, rgb(236, 236, 236) 100%)
                `;
		}
	}, []);

	const handleUpdate = useCallback(
		debounce((cnt: number) => {
			mutationFoods.mutate(cnt);
		}, 300),
		[],
	);

	/** 수량 변경 이벤트 */
	const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const event = e.target;
		setCount(event.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
		if (rangeRef.current) {
			rangeRef.current.style.background = `
		linear-gradient(to right, #00C981 0%, #00C981 ${Math.floor(
			(Number(event.value) / Number(nowTotal)) * 100,
		)}%, rgb(236, 236, 236) ${Math.floor((Number(event.value) / Number(nowTotal)) * 100)}%, rgb(236, 236, 236) 100%)
			`;
		}
		handleUpdate(Number(event.value));
	};
	return (
		<div className="flex items-center justify-between w-full">
			<input
				ref={rangeRef}
				className="range"
				type="range"
				min={0}
				max={nowTotal}
				step={1}
				value={nowCount}
				onChange={handleCount}
			/>
			<div className="flex items-center justify-center w-12 h-8 text-xs font-bold text-black border rounded-lg bg-light/background stroke">
				{nowCount}
				{total < 0 ? '%' : ''}
			</div>
		</div>
	);
}

export default Slider;
