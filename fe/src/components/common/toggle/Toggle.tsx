import './toggle.css';
import { useAppDispatch } from '../../../hooks/useStore';
import { setIsAlarm, setIsCycle, setIsDark, setIsPurchase } from '../../../store/modules/user';

interface Props {
	isCheck: boolean;
	onState: boolean;
	type: string;
}

function Toggle({ isCheck, onState, type }: Props) {
	const dispatch = useAppDispatch();

	const toggleHandler = () => {
		if (type === 'isDark') dispatch(setIsDark(!onState));
		if (type === 'isAlarm') dispatch(setIsAlarm(!onState));
		if (type === 'isCycle') dispatch(setIsCycle(!onState));
		if (type === 'isPurchase') dispatch(setIsPurchase(!onState));
	};

	return (
		<div className="flex items-center justify-center w-full mb-12">
			<label htmlFor={type} className="flex items-center cursor-pointer">
				<div className="relative">
					<input type="checkbox" id={type} className="sr-only" disabled={isCheck} onClick={toggleHandler} />
					{onState === false ? (
						<div className="block h-8 rounded-full w-14 bg-light/boldStroke" />
					) : (
						<div className="block h-8 rounded-full w-14 bg-green" />
					)}
					<div className="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1" />
				</div>
			</label>
		</div>
	);
}

export default Toggle;
