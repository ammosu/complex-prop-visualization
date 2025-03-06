import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Calendar } from 'lucide-react';
import { usePropertyData } from '../../context/PropertyDataContext';
import CustomTooltip from '../common/CustomTooltip';

const PriceTrendChart = () => {
  const { monthlyData } = usePropertyData();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
        交易價格與估值趨勢
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearMonth" />
            <YAxis 
              domain={[(dataMin) => Math.floor(dataMin - 5), (dataMax) => Math.ceil(dataMax + 5)]}
              tickFormatter={(value) => parseFloat(value).toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              name="平均交易價格"
              type="monotone"
              dataKey="avgTradePrice"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              name="平均估值"
              type="monotone"
              dataKey="avgEstimatedPrice"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceTrendChart;