import React from 'react';
import { usePropertyData } from '../context/PropertyDataContext';

const TabNavigation = () => {
  const { activeTab, setActiveTab } = usePropertyData();

  return (
    <div className="flex border-b mt-4">
      <button
        className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        onClick={() => setActiveTab('overview')}
      >
        綜合分析
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'trend' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        onClick={() => setActiveTab('trend')}
      >
        時間趨勢
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'cards' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        onClick={() => setActiveTab('cards')}
      >
        卡片式呈現
      </button>
    </div>
  );
};

export default TabNavigation;