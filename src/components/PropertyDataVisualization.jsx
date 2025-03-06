import React from 'react';
import { usePropertyData } from '../context/PropertyDataContext';
import FileUploader from './FileUploader';
import LoadingIndicator from './common/LoadingIndicator';
import ControlPanel from './ControlPanel';
import OverviewPanel from './OverviewPanel';
import TrendAnalysisChart from './charts/TrendAnalysisChart';
import TransactionCards from './TransactionCards';

const PropertyDataVisualization = () => {
  const { csvData, isLoading, activeTab } = usePropertyData();

  // 根據當前標籤頁渲染不同的內容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPanel />;
      case 'trend':
        return <TrendAnalysisChart />;
      case 'cards':
        return <TransactionCards />;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* 上傳區域 */}
      {!csvData && <FileUploader />}
      
      {/* 載入中 */}
      {isLoading && <LoadingIndicator />}
      
      {/* 視覺化區域 */}
      {csvData && !isLoading && (
        <>
          <ControlPanel />
          {renderTabContent()}
        </>
      )}
    </div>
  );
};

export default PropertyDataVisualization;