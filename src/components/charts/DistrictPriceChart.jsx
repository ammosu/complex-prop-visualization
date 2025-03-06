import React from 'react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Map } from 'lucide-react';
import { usePropertyData } from '../../context/PropertyDataContext';
import CustomTooltip from '../common/CustomTooltip';

const DistrictPriceChart = () => {
  const { districtData } = usePropertyData();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4 flex items-center">
        <Map className="w-5 h-5 mr-2 text-blue-500" />
        行政區價格差異
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={districtData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="district" />
            <YAxis 
              yAxisId="left"
              domain={[(dataMin) => Math.floor(dataMin - 5), (dataMax) => Math.ceil(dataMax + 5)]}
              tickFormatter={(value) => parseFloat(value).toFixed(2)}
            />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              name="平均交易價格" 
              dataKey="avgPrice" 
              fill="#3B82F6" 
            />
            <Bar 
              yAxisId="left"
              name="平均估值" 
              dataKey="avgEstimated" 
              fill="#F59E0B" 
            />
            <Line
              yAxisId="right"
              name="價差"
              type="monotone"
              dataKey="difference"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistrictPriceChart;