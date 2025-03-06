import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Home } from 'lucide-react';
import { usePropertyData } from '../../context/PropertyDataContext';
import CustomTooltip from '../common/CustomTooltip';

const FloorPriceChart = () => {
  const { floorData } = usePropertyData();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4 flex items-center">
        <Home className="w-5 h-5 mr-2 text-blue-500" />
        各樓層價格分布
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={floorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="floorGroup" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              name="平均交易價格" 
              dataKey="avgTradePrice" 
              fill="#3B82F6" 
            />
            <Bar 
              name="平均估值" 
              dataKey="avgEstimatedPrice" 
              fill="#F59E0B" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FloorPriceChart;