import { ReactJSXElement } from '@storybook/types';
import React from 'react';

interface AccordionProps {
	/**
	 * 강조여부
	 */
	primary?: boolean;
	/**
	 * 제목
	 */
	label: string;
	/**
	 * 펼쳐짐 여부
	 */
	open?: boolean;
	/**
	 * 내부에 담을 컴포넌트
	 */
	children?: ReactJSXElement;
}

/**
 * Primary UI component for user interaction
 */
export const Accordion = ({ primary = false, open = false, label, children }: AccordionProps) => {
	const mode = primary ? 'bg-green' : '';
	return (
		<div
			className={`mx-32 w-auto border text-light/text dark:text-dark/text bg-light/component dark:bg-dark/component border-light/stroke dark:border-dark/stroke rounded-lg overflow-hidden`}
		>
			<div className={`${mode} h-10 text-sm flex items-center p-3`}>{label}</div>
			<div>{children ?? <input />}</div>
		</div>
	);
};
