"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ChartPoint = {
  date: string; // e.g. "2025-10-27T02:00:00.000Z"
  passed: number;
  failed: number;
};

type Props = {
  data: ChartPoint[];
};

// Helper to format dates like "Oct 27" or "Oct 27, 2:00 AM"
function formatDateLabel(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TrendChart({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md w-[90%] max-w-6xl mx-auto h-[70vh] overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Total Tests Passed per Run
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            label={{ value: "Run Date", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Number of Tests",
              angle: -90,
              position: "insideLeft",
            }}
            allowDecimals={false}
            domain={[0, "dataMax + 1"]}
          />
          <Tooltip
            labelFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              });
            }}
          />
          <Legend />
          <Bar dataKey="passed" fill="#22c55e" name="Passed Tests" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
