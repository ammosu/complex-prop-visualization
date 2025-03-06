import React, { createContext, useState, useContext } from 'react';
import { processData } from '../utils/dataUtils';
import Papa from 'papaparse';

// 創建上下文
const PropertyDataContext = createContext();

// 自定義 Hook 以便在組件中使用上下文
export const usePropertyData = () => useContext(PropertyDataContext);

// 上下文提供者組件
export const PropertyDataProvider = ({ children }) => {
  // 狀態管理
  const [csvData, setCsvData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [floorFilter, setFloorFilter] = useState('all');
  const [areaSizeFilter, setAreaSizeFilter] = useState('all');
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [expandedMonths, setExpandedMonths] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [stats, setStats] = useState(null);
  const [fileError, setFileError] = useState("");
  const [communityName, setCommunityName] = useState("");

  // 檔案上傳處理
  const handleFileUpload = (event) => {
    setIsLoading(true);
    setFileError("");
    
    const file = event.target.files[0];
    if (!file) {
      setIsLoading(false);
      return;
    }
    
    // 檢查是否為CSV檔案
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setFileError("請上傳CSV檔案");
      setIsLoading(false);
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = () => {
      const csvText = reader.result;
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data);
          
          // 從CSV中提取社區名稱（如果存在）
          if (results.data.length > 0 && results.data[0]['社區名稱']) {
            setCommunityName(results.data[0]['社區名稱']);
          } else {
            // 如果CSV中沒有社區名稱欄位，嘗試從地址中提取
            const firstAddress = results.data[0]?.['地址'] || '';
            // 假設地址格式中可能包含社區名稱，例如：台北市信義區松仁路100號（總太聚作社區）
            const match = firstAddress.match(/（(.+)）/);
            if (match && match[1]) {
              setCommunityName(match[1]);
            } else {
              setCommunityName(""); // 如果無法提取，設為空字串
            }
          }
          
          const processedData = processData(results.data);
          if (processedData) {
            setStats(processedData.stats);
            setMonthlyData(processedData.monthlyData);
            setFloorData(processedData.floorData);
            setScatterData(processedData.scatterData);
            setDistrictData(processedData.districtData);
          }
          setIsLoading(false);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setFileError("解析CSV檔案時發生錯誤");
          setIsLoading(false);
        }
      });
    };
    
    reader.onerror = () => {
      setFileError("讀取檔案時發生錯誤");
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  // 提供給子組件的值
  const value = {
    csvData,
    isLoading,
    activeTab,
    setActiveTab,
    dateRange,
    setDateRange,
    floorFilter,
    setFloorFilter,
    areaSizeFilter,
    setAreaSizeFilter,
    expandedFilters,
    setExpandedFilters,
    selectedMonth,
    setSelectedMonth,
    expandedMonths,
    setExpandedMonths,
    monthlyData,
    floorData,
    scatterData,
    districtData,
    stats,
    fileError,
    handleFileUpload,
    communityName
  };

  return (
    <PropertyDataContext.Provider value={value}>
      {children}
    </PropertyDataContext.Provider>
  );
};
