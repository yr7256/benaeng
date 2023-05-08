import React, { ReactNode } from 'react';
import './Modal.css';

interface Props {
	/**
	 * 모드
	 */
	mode: 'alert' | 'confirm' | 'form';
	/**
	 * 크기
	 */
	size: 'sm' | 'lg';
	/**
	 * 제목
	 */
	label: string;
	/**
	 * 표시 여부
	 */
	open: boolean | undefined;
	/**
	 * 닫기 이벤트
	 */
	onClose(): void;
	/**
	 * 내부에 담을 컴포넌트
	 */
	children: ReactNode | undefined;
	/**
	 * 완료 버튼 텍스트
	 */
	submitText: string;
	/**
	 * 완료 버튼 이벤트
	 */
	onSubmit(): void;
}

/**
 * Primary UI component for user interaction
 */
function Modal({ mode, size, open = false, onClose, label, children, submitText, onSubmit }: Props) {
	return (
		<div className={`modal delay-100 ${open ? 'bg-black/50 z-[1000] opacity-1' : 'z-[-1] opacity-0'}`}>
			<section
				className={`w-full border component stroke ${size === 'lg' ? 'max-w-lg m-6' : 'max-w-sm m-10'} ${
					open ? 'slide-in-bottom' : 'slide-out-bottom'
				}`}
			>
				{/* 라벨 */}
				<div className="h-12 text-sm flex items-center justify-between">
					{/* 라벨 명 */}
					<h1 className="px-6 py-3">{label}</h1>

					{/* 취소 버튼 */}
					{mode === 'form' && (
						<button type="button" className="px-6 py-3 cursor-pointer text-red" onClick={onClose}>
							취소
						</button>
					)}
				</div>

				{/* 내용 */}
				<hr className="stroke" />
				<div className="box-border p-6 text-sm w-full">
					{children ?? (
						<div className="h-24 flex justify-center items-center text-gray text-sm">아직 내용이 없어요</div>
					)}
				</div>

				{/* 버튼 공간 */}
				<div className="w-full flex h-12 box-border">
					{/* 취소 버튼 */}
					{mode === 'confirm' && (
						<button
							type="button"
							onClick={onClose}
							className="cursor-pointer box-border text-center bg-light/stroke dark:bg-dark/stroke text-red text-sm flex-1"
						>
							취소
						</button>
					)}

					{/* 완료 버튼 */}
					<button
						type="button"
						onClick={onSubmit}
						className="cursor-pointer box-border text-center bg-green text-sm text-white flex-[2] border-t stroke"
					>
						{submitText}
					</button>
				</div>
			</section>
		</div>
	);
}

export default Modal;
