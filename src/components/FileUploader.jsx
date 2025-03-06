import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { usePropertyData } from '../context/PropertyDataContext';

const FileUploader = () => {
  const { handleFileUpload, isLoading, fileError, communityName } = usePropertyData();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload({ file });
    }
  };

  const loadExampleData = async () => {
    try {
      const response = await fetch('/example_with_community.csv');
      const csvText = await response.text();
      
      // 創建一個File對象
      const file = new File([csvText], 'example_with_community.csv', { type: 'text/csv' });
      
      // 使用現有的handleFileUpload函數處理文件
      handleFileUpload({ file });
    } catch (error) {
      console.error('載入範例資料失敗:', error);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
        <Upload size={64} />
      </div>
      <p className="mb-4 text-gray-600">將CSV檔案拖放到此處或點擊上傳</p>
      <div className="flex justify-center space-x-4">
        <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-block">
          選擇CSV檔案
        </label>
        <button 
          onClick={loadExampleData}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-flex items-center"
          disabled={isLoading}
        >
          <FileText size={18} className="mr-2" />
          載入範例資料
        </button>
      </div>
      <input 
        id="file-upload" 
        type="file" 
        accept=".csv" 
        className="hidden" 
        onChange={handleFileUpload}
        disabled={isLoading}
      />
      {fileError && <p className="mt-4 text-red-500">{fileError}</p>}
    </div>
  );
};

export default FileUploader;
