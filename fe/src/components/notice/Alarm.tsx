import useAlarm from '../../hooks/useAlarm';
import FoodIcon from '../common/FoodIcon';

function Alarm() {
	const food = '우유';
	const type = 0;
	const alarm = useAlarm(type, food, 0, 0);
	return (
		<div className="h-24 rounded-lg w-88 text component stroke">
			<FoodIcon />
			<div>
				<div>{alarm.msg}</div>
				<div>{alarm.link}</div>
			</div>
		</div>
	);
}

export default Alarm;
