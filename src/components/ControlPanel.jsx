import React from 'react';
import FilterPanel from './FilterPanel';
import StatsPanel from './StatsPanel';
import TabNavigation from './TabNavigation';

const ControlPanel = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <FilterPanel />
      <StatsPanel />
      <TabNavigation />
    </div>
  );
};

export default ControlPanel;