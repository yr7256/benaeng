import React, { useState } from 'react';

interface TabProps {
  labels: string[];
  activeTab: number;
  onTabClick: (tabNumber: number) => void;
}

const Tab: React.FC<TabProps> = ({ labels, activeTab, onTabClick }) => {
  return (
    <ul className="flex justify-center list-none">
      {labels.map((label, index) => (
        <li
          key={index}
          onClick={() => onTabClick(index + 1)}
          className={`inline-block px-4 py-2 cursor-pointer text-green ${index+1 === activeTab ? 'bg-green text-white' : ''}`}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};

export default Tab;