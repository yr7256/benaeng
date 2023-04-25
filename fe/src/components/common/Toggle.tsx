import { useState } from 'react';
import './toggle.css';

function Toggle() {
	const [isOn, setisOn] = useState(false);

	const toggleHandler = () => {
		setisOn(!isOn);
	};

	return (
		<div className="flex items-center justify-center w-full mb-12">
			<label htmlFor="toggleB" className="flex items-center cursor-pointer">
				<div className="relative">
					<input type="checkbox" id="toggleB" className="sr-only" onClick={toggleHandler} />
					{isOn === false ? (
						<div className="block w-14 h-8 rounded-full bg-light/boldStroke" />
					) : (
						<div className="block w-14 h-8 rounded-full bg-green" />
					)}
					<div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition bg-white" />
				</div>
			</label>
		</div>
	);
}

export default Toggle;
