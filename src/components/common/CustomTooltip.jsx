import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="text-sm font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {
              typeof entry.value === 'number'
                ? (entry.dataKey === 'mape' || entry.dataKey === 'mpe'
                    ? `${entry.value.toFixed(2)}%`
                    : entry.value.toFixed(2))
                : entry.value
            }
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;