import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Report, Calendar, FoodAnalysis } from '../components/analysis';
import Tab from '../components/common/Tab';

type TabMapping = {
	[key: string]: string;
};

const Analysis: React.FC = () => {
	const { type } = useParams() as { type: string };
	const [activeTab, setActiveTab] = useState<string>('');
	const navigate = useNavigate();

	const tabMapping: TabMapping = {
		'월간 리포트': 'report',
		'냉장고 캘린더': 'calendar',
		'식품별 분석': 'food',
	};

	const handleTabClick = (tabLabel: string) => {
		setActiveTab(tabLabel);
		navigate(`/analysis/${tabMapping[tabLabel]}`);
	};

	return (
		<div>
			<Tab labels={Object.keys(tabMapping)} activeTab={activeTab} onTabClick={handleTabClick} />
			{type === 'report' && <Report />}
			{type === 'calendar' && <Calendar />}
			{type === 'food' && <FoodAnalysis />}
		</div>
	);
};

export default Analysis;
