import React from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, 
  Tooltip, Line, ResponsiveContainer 
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import { usePropertyData } from '../../context/PropertyDataContext';

const PriceCorrelationChart = () => {
  const { scatterData } = usePropertyData();

  const CustomScatterTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="text-xs">{data.address || '地址未知'}</p>
          <p className="text-xs">樓層: {data.floor}F / 坪數: {data.area}坪</p>
          <p className="text-xs">日期: {data.date}</p>
          <p className="text-xs font-semibold">交易價格: {data.tradePrice.toFixed(2)}</p>
          <p className="text-xs font-semibold">估值: {data.estimatedPrice.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4 flex items-center">
        <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
        交易價格與估值相關性
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="estimatedPrice" 
              name="估值" 
              domain={['auto', 'auto']}
            />
            <YAxis 
              type="number" 
              dataKey="tradePrice" 
              name="交易價格" 
              domain={['auto', 'auto']}
            />
            <ZAxis type="number" range={[50, 500]} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={<CustomScatterTooltip />}
            />
            <Scatter 
              name="房屋" 
              data={scatterData} 
              fill="#3B82F6"
            />
            {/* 基準線 */}
            <Line 
              name="基準線" 
              type="monotone" 
              dataKey="estimatedPrice" 
              data={[
                { estimatedPrice: 0, tradePrice: 0 },
                { 
                  estimatedPrice: Math.max(...(scatterData.length ? scatterData.map(d => d.estimatedPrice) : [0])), 
                  tradePrice: Math.max(...(scatterData.length ? scatterData.map(d => d.estimatedPrice) : [0])) 
                }
              ]}
              stroke="#FF0000"
              strokeDasharray="5 5"
              dot={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceCorrelationChart;