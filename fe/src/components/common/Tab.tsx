import React from 'react';
import './tab.css';

interface TabProps {
	labels: string[];
	activeTab: string;
	onTabClick: (tabNumber: string) => void;
}

const Tab: React.FC<TabProps> = ({ labels, activeTab, onTabClick }) => {
	return (
		<ul className="flex list-none tabs-container border-2 border-light/stroke">
			{labels.map((label, index) => (
				<li
					key={index}
					onClick={() => onTabClick(label)}
					className={`inline-block cursor-pointer text-green tab-container ${
						activeTab === label ? 'bg-green text-white' : ''
					}`}
				>
					{label}
				</li>
			))}
		</ul>
	);
};

export default Tab;
