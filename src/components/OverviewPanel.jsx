import React from 'react';
import PriceTrendChart from './charts/PriceTrendChart';
import PriceCorrelationChart from './charts/PriceCorrelationChart';
import FloorPriceChart from './charts/FloorPriceChart';

const OverviewPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PriceTrendChart />
      <PriceCorrelationChart />
      <FloorPriceChart />
    </div>
  );
};

export default OverviewPanel;