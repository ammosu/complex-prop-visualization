import React from 'react';
import { usePropertyData } from '../context/PropertyDataContext';
import { formatNumber } from '../utils/dataUtils';

const StatsPanel = () => {
  const { stats } = usePropertyData();

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-3 rounded-lg">
      <div className="text-center p-2 bg-blue-50 rounded-lg">
        <div className="text-xs text-gray-500">資料筆數</div>
        <div className="text-lg font-bold text-blue-600">{formatNumber(stats.count)}</div>
      </div>
      <div className="text-center p-2 bg-blue-50 rounded-lg">
        <div className="text-xs text-gray-500">平均交易價格</div>
        <div className="text-lg font-bold text-blue-600">{stats.avgPrice}</div>
      </div>
      <div className="text-center p-2 bg-blue-50 rounded-lg">
        <div className="text-xs text-gray-500">平均估值</div>
        <div className="text-lg font-bold text-blue-600">{stats.avgEstimated}</div>
      </div>
      <div className="text-center p-2 bg-amber-50 rounded-lg">
        <div className="text-xs text-gray-500">平均價差</div>
        <div className={`text-lg font-bold ${parseFloat(stats.priceDiff) >= 0 ? 'text-red-500' : 'text-green-500'}`}>
          {stats.priceDiff}%
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;