import React, { ReactNode, useState } from 'react';
import { TbChevronUp } from 'react-icons/tb';
import AnimateHeight from 'react-animate-height';

interface AccordionProps {
	/**
	 * 강조여부
	 */
	primary: boolean | undefined;
	/**
	 * 제목
	 */
	label: string;
	/**
	 * 펼쳐짐 여부
	 */
	open: boolean | undefined;
	/**
	 * 내부에 담을 컴포넌트
	 */
	children: ReactNode | undefined;
}

/**
 * Primary UI component for user interaction
 */
function Accordion({ primary = false, open = false, label, children }: AccordionProps) {
	const [_open, setOpen] = useState(open);
	const handleOpen = () => setOpen(!_open);

	return (
		<section className="border component stroke overflow-hidden">
			{/* 라벨 */}
			<button
				type="button"
				className={`${
					primary ? 'bg-green font-bold' : ''
				} h-10 text-sm flex items-center justify-between cursor-pointer w-full`}
				onClick={handleOpen}
			>
				{/* 라벨 명 */}
				<span className="px-4">{label}</span>

				{/* 폴드 버튼 */}
				<div className="px-4">
					<TbChevronUp
						className={`text-2xl ${primary ? 'text-white' : 'text-green'} transition-all ${_open ? '' : 'rotate-180'}`}
					/>
				</div>
			</button>

			{/* 내용 */}
			<AnimateHeight height={_open ? 'auto' : 0} className="box-content">
				<hr className="stroke" />
				{children ?? (
					<div className="component w-full h-40 flex justify-center items-center text-gray text-sm">
						아직 내용이 없어요
					</div>
				)}
			</AnimateHeight>
		</section>
	);
}

export default Accordion;
