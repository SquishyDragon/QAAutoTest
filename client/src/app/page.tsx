import ResultsTable from "@/components/ResultsTable";
import SummaryCard from "@/components/SummaryCard";
import TrendChart from "@/components/TrendChart";
import { fetchResults } from "@/lib/api";

export default async function Home() {
  const results = await fetchResults();

  const trend = results.map((item: any) => ({
    date: item.timestamp,
    passed: item.status === "passed" ? 1 : 0,
    failed: item.status === "failed" ? 1 : 0,
  }));

  const passed = results.filter((r) => r.status === "passed").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <section className="snap-start h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-row items-center justify-center w-[90%] max-w-6xl gap-12">
          {/* Left: Summary Card */}
          <SummaryCard total={results.length} passed={passed} failed={failed} />

          {/* Right: Static text */}
          <div className="w-1/3 text-left">
            <h2 className="text-2xl font-semibold mb-4">About Your Tests</h2>
            <p className="text-gray-700 mb-2">
              This dashboard shows the results of your automated tests using
              Playwright.
            </p>
            <p className="text-gray-700">
              You can track pass/fail rates over time, view detailed results,
              and identify trends.
            </p>
          </div>
        </div>
      </section>

      <section className="snap-start h-screen flex items-center justify-center">
        <TrendChart data={trend} />
      </section>

      <section className="snap-start h-screen flex items-center justify-center">
        <ResultsTable results={results} />
      </section>
    </main>
  );
}

export type TestResult = {
  id: number;
  test_name: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  timestamp: string;
};
