import { TbBellFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router';

interface Props {
	isAlarm: boolean;
}

function AlarmButton({ isAlarm }: Props) {
	const navigator = useNavigate();
	/** 알람 버튼 클릭 이벤트 */
	const handleAlarm = () => {
		navigator('/notice');
	};
	return (
		<button type="button" className="relative w-12 h-12 cursor-pointer" onClick={handleAlarm}>
			{isAlarm && (
				<span className="absolute flex w-3 h-3 top-0.5 right-0.5">
					<span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-red" />
					<span className="relative inline-flex w-3 h-3 rounded-full bg-red" />
				</span>
			)}
			{/* {isAlarm && <div className="absolute w-2 h-2 rounded-lg right-1 top-1 bg-red" />} */}
			<div className="flex items-center w-12 h-12 border rounded-8 bg-light/component dark:bg-dark/component stroke">
				<TbBellFilled className="block m-auto text-2xl text-green" />
			</div>
		</button>
	);
}
export default AlarmButton;
