import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Analysis1, Analysis2, Analysis3 } from '../components/analysis';
import Tab from '../components/common/Tab';

const Analysis: React.FC = () => {
  const { type } = useParams()  as { type: string };
  const [activeTab, setActiveTab] = useState<number>(parseInt(type || '1', 10));
  const navigate = useNavigate();

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    navigate(`/analysis/${tabNumber}`);
  }

  const labels = ['월간 리포트', '냉장고 캘린더', '식품별 분석'];

  return (
    <div>
      <Tab labels={labels} activeTab={activeTab} onTabClick={handleTabClick} />
      {activeTab === 1 && <Analysis1 />}
      {activeTab === 2 && <Analysis2 />}
      {activeTab === 3 && <Analysis3 />}
    </div>
  );
};

export default Analysis;