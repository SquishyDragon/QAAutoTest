import ResultsTable from "@/components/ResultsTable";
import TrendChart from "@/components/TrendChart";
import { fetchResults } from "@/lib/api";

export default async function Home() {
  const results = await fetchResults();
  console.log(results);
  const trend = results.map((item: any) => ({
    date: item.timestamp,
    passed: item.status === "passed" ? 1 : 0,
    failed: item.status === "failed" ? 1 : 0,
  }));

  const passed = results.filter((r) => r.status === "passed").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return (
    <main>
      <TrendChart data={trend} />
      <ResultsTable results={results} />
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
