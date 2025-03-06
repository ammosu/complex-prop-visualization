import React from 'react';
import { Map } from 'lucide-react';
import { usePropertyData } from '../context/PropertyDataContext';

const TransactionCards = () => {
  const { districtData, selectedMonth } = usePropertyData();

  // 先按月份分組
  const transactions = [];
  
  districtData.forEach(monthGroup => {
    const filteredRecords = selectedMonth === 'all' || selectedMonth === monthGroup.month 
      ? monthGroup.records 
      : [];
    
    if (filteredRecords.length > 0) {
      transactions.push({
        month: monthGroup.month,
        records: filteredRecords,
        avgPrice: monthGroup.avgPrice,
        avgEstimated: monthGroup.avgEstimated
      });
    }
  });

  return (
    <div className="space-y-6">
      {transactions.map((monthGroup, index) => (
        <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
          {/* 月份標題區 */}
          <div className="p-4 bg-yellow-100 flex justify-between items-center">
            <h3 className="text-lg font-bold">{monthGroup.month}</h3>
            <div className="flex text-sm">
              <div className="px-3 py-1 rounded-md bg-yellow-400 font-bold mr-2">
                {monthGroup.avgPrice.toFixed(2)}
              </div>
              <div className="px-3 py-1 rounded-md bg-amber-200 font-bold">
                交易：{monthGroup.records.length}筆
              </div>
            </div>
          </div>
          
          {/* 交易列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {monthGroup.records.map((record, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                {/* 地址區 */}
                <div className="p-3 bg-gray-50 flex items-center">
                  <div className="p-1 rounded-full bg-blue-100">
                    <Map size={16} className="text-blue-500" />
                  </div>
                  <span className="ml-2 font-medium truncate">{record.地址 || '地址未提供'}</span>
                  <span className="ml-auto text-xs text-gray-500">{record.formattedDate}</span>
                </div>
                
                {/* 價格資訊 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x">
                  <div className="p-2">
                    <div className="text-xs text-gray-500">房屋坪數</div>
                    <div className="font-medium">{record.房屋坪數?.toFixed(2) || '--'}坪</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xs text-gray-500">樓層</div>
                    <div className="font-medium">{record.所在樓層 || '--'}F</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xs text-gray-500">交易價格</div>
                    <div className="font-medium text-blue-600">{record.交易價格?.toFixed(2) || '--'}</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xs text-gray-500">估值</div>
                    <div className="font-medium text-amber-600">{record.估值?.toFixed(2) || '--'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {transactions.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <div className="text-gray-500">沒有符合條件的交易記錄</div>
        </div>
      )}
    </div>
  );
};

export default TransactionCards;