import React from 'react';

interface TabProps {
	labels: string[];
	activeTab: string;
	onTabClick: (tabNumber: string) => void;
}

function Tab({ labels, activeTab, onTabClick }: TabProps) {
	return (
		<ul className="flex list-none justify-center h-10 px-0.5 items-center text-xs max-w-88 text component rounded-2.5xl border-2 stroke">
			{labels.map(label => (
				<li
					key={label}
					onClick={() => onTabClick(label)}
					role="presentation"
					className={`flex items-center justify-center w-30 h-8 inline-block cursor-pointer text-green rounded-2.5xl font-bold ${
						activeTab === label ? 'bg-green text-white dark:text-black font-extrabold' : ''
					}`}
				>
					{label}
				</li>
			))}
		</ul>
	);
}

export default Tab;
