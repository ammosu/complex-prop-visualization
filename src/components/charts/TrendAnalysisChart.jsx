import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area
} from 'recharts';
import { usePropertyData } from '../../context/PropertyDataContext';
import CustomTooltip from '../common/CustomTooltip';

const TrendAnalysisChart = () => {
  const { monthlyData } = usePropertyData();
  const [showErrorMetrics, setShowErrorMetrics] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">價格時間趨勢分析</h3>
        <div className="flex items-center">
          <button
            onClick={() => setShowErrorMetrics(!showErrorMetrics)}
            className={`px-3 py-1 rounded text-sm ${showErrorMetrics ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {showErrorMetrics ? '顯示價格' : '顯示誤差指標'}
          </button>
        </div>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {!showErrorMetrics ? (
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="right"
                name="交易數量"
                dataKey="count"
                fill="#D1D5DB"
              />
              <Line
                yAxisId="left"
                name="平均交易價格"
                type="monotone"
                dataKey="avgTradePrice"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="left"
                name="平均估值"
                type="monotone"
                dataKey="avgEstimatedPrice"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" />
              <YAxis
                yAxisId="left"
                domain={[-20, 20]}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="right"
                name="交易數量"
                dataKey="count"
                fill="#D1D5DB"
              />
              <Line
                yAxisId="left"
                name="MAPE (平均絕對百分比誤差)"
                type="monotone"
                dataKey="mape"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="left"
                name="MPE (平均百分比誤差)"
                type="monotone"
                dataKey="mpe"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Area
                yAxisId="left"
                dataKey="mpe"
                fill="#10B98133"
                stroke="none"
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        {showErrorMetrics && (
          <div className="p-2 bg-gray-100 rounded">
            <p><strong>MAPE (平均絕對百分比誤差)：</strong>衡量估值與實際交易價格的絕對誤差百分比</p>
            <p><strong>MPE (平均百分比誤差)：</strong>衡量估值與實際交易價格的誤差方向，正值表示低估，負值表示高估</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendAnalysisChart;