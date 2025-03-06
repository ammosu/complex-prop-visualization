# 不動產與社區數據視覺化平台

這是一個基於 React 和 Recharts 的不動產與社區數據視覺化平台，可以上傳 CSV 檔案並生成各種圖表和數據分析，支援處理單一社區資料。

## 功能特點

- 上傳 CSV 檔案進行分析
- 處理單一社區資料的視覺化分析
- 多種視覺化圖表展示
- 價格趨勢折線圖
- 交易價格與估值相關性散點圖
- 樓層價格分佈柱狀圖
- 行政區價格差異複合圖
- 按月份分組的交易記錄卡片式呈現
- 篩選功能（月份、樓層、坪數）
- 響應式設計，適配各種設備

## 技術棧

- React
- Vite
- Tailwind CSS
- Recharts (圖表庫)
- PapaParse (CSV 解析)
- Lodash (數據處理)
- Lucide React (圖標)

## 安裝與運行

1. 克隆專案
```bash
git clone https://github.com/yourusername/complex-prop-visualization.git
cd complex-prop-visualization
```

2. 安裝依賴
```bash
npm install
```

3. 啟動開發服務器
```bash
npm run dev
```

4. 構建生產版本
```bash
npm run build
```

## CSV 檔案格式

上傳的 CSV 檔案應包含以下欄位：
- 交易年月日：格式為 YYYYMMDD
- 地址：不動產地址
- 所在樓層：數字
- 建物坪數：數字
- 交易價格：數字
- 估值：數字
- 社區名稱：文字（用於單一社區資料分析）

範例 CSV 檔案位於 `public/example.csv` 和 `public/example_with_community.csv`。

## 使用說明

1. 啟動應用程式後，您會看到上傳介面
2. 點擊「選擇 CSV 檔案」按鈕或將檔案拖放到指定區域
3. 上傳成功後，系統會自動處理數據並顯示視覺化結果
4. 使用頂部的頁籤切換不同的檢視模式
5. 使用篩選條件按鈕展開篩選選項，可按月份、樓層、坪數和社區進行篩選
6. 選擇特定社區以查看該社區的詳細分析

## 授權

MIT
