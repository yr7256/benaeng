import React, { useMemo } from 'react';
import './CircleGraph.css';

interface Props {
	/**
	 * 긍부정 표시 반전 여부
	 */
	reverse: boolean | undefined;
	/**
	 * 크기
	 */
	size: 'sm' | 'mid' | 'lg';
	/**
	 * 퍼센트
	 */
	percent: number;
}

/**
 * Primary UI component for user interaction
 */
function CircleGraph({ reverse = false, size, percent }: Props) {
	/**
	 * 그래프 크기
	 */
	const graphSize = useMemo(() => {
		switch (size) {
			case 'sm':
				return 'w-20 h-20 text-2xl';
			case 'mid':
				return 'w-36 h-36 text-4xl';
			case 'lg':
				return 'w-56 h-56 text-6xl';
			default:
				return '';
		}
	}, [size]);

	/**
	 * 그래프 색상
	 */
	const graphColor = useMemo(() => {
		const score = reverse ? 1 - percent : percent;
		// 안전군 : 66 초과
		if (score > 0.66) return 'stroke-green text-green';
		// 주의군 : 66 이하
		if (score > 0.33) return 'stroke-yellow text-yellow';
		// 위험군 : 33 이하
		return 'stroke-red text-red';
	}, [reverse, percent]);

	return (
		<div className={`${graphSize} ${graphColor} rounded-full flex justify-center items-center relative`}>
			<label className="z-10 font-black text-inherit text-stroke">
				<span>{percent * 100}%</span>
			</label>
			<svg className={`${graphSize} ${graphColor} absolute`}>
				<circle
					cx="50%"
					cy="50%"
					strokeWidth="25%"
					r="37.5%"
					fill="none"
					className={`${graphSize} stroke-light/stroke dark:stroke-dark/stroke`}
				/>
				<circle
					pathLength={100}
					cx="50%"
					cy="50%"
					strokeLinecap="round"
					strokeWidth="25%"
					r="37.5%"
					fill="none"
					strokeDasharray="100"
					strokeDashoffset={100 - (reverse ? 1 - percent : percent) * 100}
					className={`${graphSize} -rotate-90 stroke-${graphColor} origin-center grow`}
				/>
			</svg>
		</div>
	);
}

export default CircleGraph;
