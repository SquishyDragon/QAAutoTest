"use client";
import React, { useState } from "react";

type Result = {
  id: number;
  test_name: string;
  status: string;
  duration: number;
  timestamp: string;
};

type Props = {
  results: Result[];
};

export default function ResultsTable({ results }: Props) {
  const [sortBy, setSortBy] = useState<"timestamp" | "duration">("timestamp");
  const sorted = [...results].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Test Results</h2>
        <select
          className="border p-2 rounded-md text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="timestamp">Newest</option>
          <option value="duration">Longest Duration</option>
        </select>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Test Name</th>
            <th>Status</th>
            <th>Duration (ms)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id} className="border-b last:border-none">
              <td className="py-2">{r.test_name}</td>
              <td
                className={
                  r.status === "passed" ? "text-green-600" : "text-red-600"
                }
              >
                {r.status}
              </td>
              <td>{r.duration}</td>
              <td>{new Date(r.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
