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
    <div className="bg-white flex flex-col justify-center items-center text-center rounded-2xl p-6 sm:p-8 shadow-md w-[90%] max-w-4xl mx-auto min-h-[60vh] sm:min-h-[70vh]">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Test Summary</h2>
      <p className="text-gray-600 mb-4 text-base sm:text-lg">
        Pass Rate Overview
      </p>
      <div className="text-5xl sm:text-6xl font-extrabold mb-3">
        {passRate}%
      </div>
      <div className="text-sm sm:text-base text-gray-500">
        ✅ {passed} passed &nbsp; ❌ {failed} failed
      </div>
    </div>
  );
}
