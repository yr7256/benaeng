import React from 'react';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router';

interface Props {
	className: string | undefined;
}

function BackButton({ className = '' }: Props) {
	const navigate = useNavigate();

	const onClick = () => navigate(-1);
	return (
		<button type="button" name="back-button" onClick={onClick} className={`text-4xl px-4 py-2 ${className}`}>
			<TbArrowNarrowLeft />
		</button>
	);
}

export default BackButton;
