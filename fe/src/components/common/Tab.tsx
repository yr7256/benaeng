import React from 'react';
import './tab.css';

interface TabProps {
	labels: string[];
	activeTab: string;
	onTabClick: (tabNumber: string) => void;
}

function Tab({ labels, activeTab, onTabClick }: TabProps) {
	return (
		<ul className="flex list-none tabs-container border-2 border-light/stroke">
			{labels.map(label => (
				<li
					key={label}
					onClick={() => onTabClick(label)}
					role="presentation"
					className={`inline-block cursor-pointer text-green tab-container ${
						activeTab === label ? 'bg-green text-white' : ''
					}`}
				>
					{label}
				</li>
			))}
		</ul>
	);
}

export default Tab;
