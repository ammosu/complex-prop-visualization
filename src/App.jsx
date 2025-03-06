import React from 'react';
import PropertyDataVisualization from './components/PropertyDataVisualization';
import { PropertyDataProvider } from './context/PropertyDataContext';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600">房產數據視覺化平台</h1>
        <p className="text-gray-600 mt-2">上傳 CSV 檔案以分析房產交易數據</p>
      </header>
      
      <main>
        <PropertyDataProvider>
          <PropertyDataVisualization />
        </PropertyDataProvider>
      </main>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} 房產數據視覺化平台</p>
      </footer>
    </div>
  );
}

export default App;