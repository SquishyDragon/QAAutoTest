"use client";
import React from "react";

type SummaryCardProps = {
  total: number;
  passed: number;
  failed: number;
};

export default function SummaryCard({
  total,
  passed,
  failed,
}: SummaryCardProps) {
  const passRate = total ? Math.round((passed / total) * 100) : 0;

  return (
    <div className="bg-white flex flex-col justify-center items-center ext-center rounded-2xl p-8 shadow-md w-[90%] max-w-6xl mx-auto h-[80vh] overflow-auto">
      <h2 className="text-xl font-semibold mb-2">Test Summary</h2>
      <p className="text-gray-600 mb-4">Pass Rate Overview</p>
      <div className="text-3xl font-bold mb-2">{passRate}%</div>
      <div className="text-sm text-gray-500">
        ✅ {passed} passed &nbsp; ❌ {failed} failed
      </div>
    </div>
  );
}
