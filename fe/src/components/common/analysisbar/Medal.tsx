import goldMedal from '../../../assets/common/gold.svg';
import silverMedal from '../../../assets/common/silver.svg';
import bronzeMedal from '../../../assets/common/bronze.svg';

interface MedalProps {
	medal: string;
}

interface MedalImages {
	[key: string]: string;
}

function Medal({ medal }: MedalProps) {
	const medalImages: MedalImages = {
		gold: goldMedal,
		silver: silverMedal,
		bronze: bronzeMedal,
	};
	// props로 메달 이름 받기
	return <img src={medalImages[medal]} alt="medal" />;
	// return <img src={`../../assets/common/${medal}.svg`} alt="medal" />;
}

export default Medal;
