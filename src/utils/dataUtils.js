import _ from 'lodash';

// 格式化日期
export const formatDate = (dateInt) => {
  if (!dateInt) return '';
  const dateStr = dateInt.toString();
  if (dateStr.length !== 8) return dateStr;
  
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}/${month}/${day}`;
};

// 計算MAPE (平均絕對百分比誤差)
export const calculateMAPE = (actual, forecast) => {
  if (!actual || !forecast || actual.length !== forecast.length) return null;
  
  let sum = 0;
  let validCount = 0;
  
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] === 0 || !actual[i]) continue; // 避免除以零
    sum += Math.abs((actual[i] - forecast[i]) / actual[i]);
    validCount++;
  }
  
  if (validCount === 0) return null;
  return (sum / validCount) * 100;
};

// 計算MPE (平均百分比誤差)
export const calculateMPE = (actual, forecast) => {
  if (!actual || !forecast || actual.length !== forecast.length) return null;
  
  let sum = 0;
  let validCount = 0;
  
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] === 0 || !actual[i]) continue; // 避免除以零
    sum += (forecast[i] - actual[i]) / actual[i];
    validCount++;
  }
  
  if (validCount === 0) return null;
  return (sum / validCount) * 100;
};

// 格式化數字顯示
export const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  return num.toLocaleString('zh-TW');
};

// 處理CSV數據
export const processData = (data) => {
  if (!data || data.length === 0) return null;
  
  // 計算基本統計資訊
  const priceValues = data.map(item => item['交易價格']).filter(p => p);
  const estimatedValues = data.map(item => item['估值']).filter(p => p);
  
  // 計算整體的MAPE和MPE
  const allPrices = data.map(item => item['交易價格']).filter(p => p);
  const allEstimates = data.map(item => item['估值']).filter(p => p);
  
  // 確保資料數量一致
  const minLength = Math.min(allPrices.length, allEstimates.length);
  const trimmedPrices = allPrices.slice(0, minLength);
  const trimmedEstimates = allEstimates.slice(0, minLength);
  
  const overallMAPE = calculateMAPE(trimmedPrices, trimmedEstimates);
  const overallMPE = calculateMPE(trimmedPrices, trimmedEstimates);
  
  const stats = {
    count: data.length,
    avgPrice: _.mean(priceValues).toFixed(2),
    avgEstimated: _.mean(estimatedValues).toFixed(2),
    maxPrice: _.max(priceValues).toFixed(2),
    minPrice: _.min(priceValues).toFixed(2),
    priceDiff: ((_.mean(priceValues) - _.mean(estimatedValues)) / _.mean(estimatedValues) * 100).toFixed(2),
    mape: overallMAPE ? overallMAPE.toFixed(2) : null,
    mpe: overallMPE ? overallMPE.toFixed(2) : null
  };
  
  // 處理月份資料
  const groupedByMonth = {};
  
  data.forEach(item => {
    const date = item['交易年月日']?.toString() || '';
    if (date.length >= 6) {
      const yearMonth = date.substring(0, 6); // 取年月 (YYYYMM)
      if (!groupedByMonth[yearMonth]) {
        groupedByMonth[yearMonth] = { trades: [], prices: [], estimates: [] };
      }
      
      groupedByMonth[yearMonth].trades.push(item);
      if (item['交易價格']) groupedByMonth[yearMonth].prices.push(item['交易價格']);
      if (item['估值']) groupedByMonth[yearMonth].estimates.push(item['估值']);
    }
  });
  
  const monthlyDataArray = Object.keys(groupedByMonth).map(yearMonth => {
    const year = yearMonth.substring(0, 4);
    const month = yearMonth.substring(4, 6);
    const displayDate = `${year}/${month}`;
    
    // 計算每月的MAPE和MPE
    const monthlyPrices = groupedByMonth[yearMonth].prices;
    const monthlyEstimates = groupedByMonth[yearMonth].estimates;
    
    // 確保資料數量一致
    const minLength = Math.min(monthlyPrices.length, monthlyEstimates.length);
    const trimmedPrices = monthlyPrices.slice(0, minLength);
    const trimmedEstimates = monthlyEstimates.slice(0, minLength);
    
    const monthlyMAPE = calculateMAPE(trimmedPrices, trimmedEstimates);
    const monthlyMPE = calculateMPE(trimmedPrices, trimmedEstimates);
    
    return {
      yearMonth: displayDate,
      avgTradePrice: parseFloat(_.mean(groupedByMonth[yearMonth].prices).toFixed(2)),
      avgEstimatedPrice: parseFloat(_.mean(groupedByMonth[yearMonth].estimates).toFixed(2)),
      count: groupedByMonth[yearMonth].trades.length,
      mape: monthlyMAPE ? parseFloat(monthlyMAPE.toFixed(2)) : null,
      mpe: monthlyMPE ? parseFloat(monthlyMPE.toFixed(2)) : null,
      sortKey: parseInt(yearMonth) // 用於排序
    };
  });
  
  // 依時間排序
  const monthlyData = _.sortBy(monthlyDataArray, 'sortKey');
  
  // 處理樓層資料
  const floorGroups = {
    '1-3樓': { prices: [], estimates: [] },
    '4-7樓': { prices: [], estimates: [] },
    '8樓以上': { prices: [], estimates: [] }
  };
  
  data.forEach(item => {
    const floor = item['所在樓層'];
    const price = item['交易價格'];
    const estimate = item['估值'];
    
    if (floor && price && estimate) {
      let floorGroup;
      if (floor <= 3) floorGroup = '1-3樓';
      else if (floor <= 7) floorGroup = '4-7樓';
      else floorGroup = '8樓以上';
      
      floorGroups[floorGroup].prices.push(price);
      floorGroups[floorGroup].estimates.push(estimate);
    }
  });
  
  const floorDataArray = Object.keys(floorGroups).map(group => ({
    floorGroup: group,
    avgTradePrice: parseFloat(_.mean(floorGroups[group].prices).toFixed(2)),
    avgEstimatedPrice: parseFloat(_.mean(floorGroups[group].estimates).toFixed(2)),
    count: floorGroups[group].prices.length
  }));
  
  // 處理散點圖資料
  const scatterPoints = data.map((item, index) => ({
    id: index,
    tradePrice: item['交易價格'],
    estimatedPrice: item['估值'],
    address: item['地址'],
    floor: item['所在樓層'],
    area: item['房屋坪數'],
    date: formatDate(item['交易年月日'])
  })).filter(item => item.tradePrice && item.estimatedPrice);
  
  // 處理單一社區交易記錄按月份分組
  const recordsByMonth = {};
  
  data.forEach(item => {
    const date = item['交易年月日']?.toString() || '';
    if (date.length >= 6) {
      const yearMonth = date.substring(0, 6); // 取年月 (YYYYMM)
      const year = yearMonth.substring(0, 4);
      const month = yearMonth.substring(4, 6);
      const displayMonth = `${year}年${month}月`;
      
      if (!recordsByMonth[displayMonth]) {
        recordsByMonth[displayMonth] = [];
      }
      
      recordsByMonth[displayMonth].push({
        ...item,
        formattedDate: formatDate(item['交易年月日']),
        yearMonthSort: parseInt(yearMonth) // 用於排序
      });
    }
  });
  
  // 將交易記錄按月分組並排序
  const sortedMonths = Object.keys(recordsByMonth).sort((a, b) => {
    const aSort = recordsByMonth[a][0]?.yearMonthSort || 0;
    const bSort = recordsByMonth[b][0]?.yearMonthSort || 0;
    return bSort - aSort; // 降序排列，最新的在前
  });
  
  const groupedRecords = sortedMonths.map(month => ({
    month,
    records: recordsByMonth[month],
    count: recordsByMonth[month].length,
    avgPrice: parseFloat(_.meanBy(recordsByMonth[month], '交易價格').toFixed(2)),
    avgEstimated: parseFloat(_.meanBy(recordsByMonth[month], '估值').toFixed(2))
  }));
  
  return {
    stats,
    monthlyData,
    floorData: floorDataArray,
    scatterData: scatterPoints,
    districtData: groupedRecords
  };
};
