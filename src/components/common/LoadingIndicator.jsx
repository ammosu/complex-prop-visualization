import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="text-center py-12">
      <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">正在處理資料，請稍候...</p>
    </div>
  );
};

export default LoadingIndicator;