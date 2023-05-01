import React from 'react';
import { TbSettings } from 'react-icons/tb';
import { useNavigate } from 'react-router';

function SettingButton() {
	const navigate = useNavigate();

	const onClick = () => navigate('/setting');

	return (
		<button type="button" onClick={onClick} className="p-3 rounded-full">
			<TbSettings className="text-light/boldStroke dark:text-dark/boldStroke text-2xl" />
		</button>
	);
}

export default SettingButton;
