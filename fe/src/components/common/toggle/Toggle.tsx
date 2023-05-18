interface Props {
	label: string;
	value: boolean;
	disabled: boolean;
	onToggle(): void;
	className: string;
}

function Toggle({ label, value, onToggle, disabled, className }: Props) {
	// let color = 'bg-light/boldStroke dark:bg-light/boldStroke';
	// if (type === 'isCycle' || type === 'isPurchase') color = 'bg-light/stroke dark:bg-dark/stroke';

	return (
		<button
			className={`${className} relative w-12 h-6 rounded-full
			${value ? 'bg-green border-green' : 'bg-dark/boldStroke border-dark/boldStroke'} 
			${disabled ? 'opacity-50' : ''}
			`}
			type="button"
			id={label}
			disabled={disabled}
			onClick={onToggle}
		>
			<div
				className={`component h-full aspect-square rounded-full border-2 absolute top-0 border-inherit transition-all
				${value ? 'translate-x-full' : 'translate-x-0'}`}
			/>
		</button>
	);
}

export default Toggle;
