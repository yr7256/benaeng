import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from '../components/analysis';
import Tab from '../components/common/tab/Tab';
import Topbar from '../components/common/topbar/Topbar';

type TabMapping = {
	[key: string]: string;
};

function Analysis() {
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

	useEffect(() => {
		const label = Object.keys(tabMapping).find(key => tabMapping[key] === type);
		if (label) {
			setActiveTab(label);
		}
	}, [type]);

	return (
		<div className="pl-6 pt-16 pr-6">
			<Topbar />
			<Tab labels={Object.keys(tabMapping)} activeTab={activeTab} onTabClick={handleTabClick} />
			{type === 'report' && <MonthlyReport />}
			{type === 'calendar' && <RefrigeratorCalendar />}
			{type === 'food' && <FoodAnalysis />}
		</div>
	);
}

export default Analysis;
