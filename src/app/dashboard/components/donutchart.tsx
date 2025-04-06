"use client"; 

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function DonutChart(chartData: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only set to true after the component mounts
  }, []);

  if (!isClient) {
    return <p>Loading chart...</p>; // Prevent SSR rendering
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Retention Report</h2>
      <p className="text-sm text-muted-foreground p-2">January - June 2025</p>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData.chartData}
          cx="50%"
          cy="50%"
          innerRadius={60} // ✅ Creates the Donut Shape
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.chartData.length > 0 && chartData.chartData.map((entry: { color: string | undefined; }, index: any) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

    </div>
  );
};