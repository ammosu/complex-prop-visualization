import React from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { usePropertyData } from '../context/PropertyDataContext';

const FilterPanel = () => {
  const { 
    expandedFilters, 
    setExpandedFilters, 
    selectedMonth, 
    setSelectedMonth, 
    floorFilter, 
    setFloorFilter, 
    areaSizeFilter, 
    setAreaSizeFilter,
    districtData
  } = usePropertyData();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">總太聚作社區房價分析</h3>
        <button 
          className="flex items-center text-blue-500"
          onClick={() => setExpandedFilters(!expandedFilters)}
        >
          <Filter className="w-4 h-4 mr-1" />
          篩選條件
          {expandedFilters ? 
            <ChevronUp className="w-4 h-4 ml-1" /> : 
            <ChevronDown className="w-4 h-4 ml-1" />
          }
        </button>
      </div>
      
      {/* 篩選控制項 */}
      {expandedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">交易月份</label>
            <select 
              className="w-full border rounded p-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">全部月份</option>
              {districtData.map((d, i) => (
                <option key={i} value={d.month}>{d.month}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">樓層</label>
            <select 
              className="w-full border rounded p-2"
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
            >
              <option value="all">全部樓層</option>
              <option value="1-3">1-3樓</option>
              <option value="4-7">4-7樓</option>
              <option value="8+">8樓以上</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">坪數區間</label>
            <select 
              className="w-full border rounded p-2"
              value={areaSizeFilter}
              onChange={(e) => setAreaSizeFilter(e.target.value)}
            >
              <option value="all">全部坪數</option>
              <option value="0-20">20坪以下</option>
              <option value="20-40">20-40坪</option>
              <option value="40+">40坪以上</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;