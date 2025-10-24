import ResultsTable from "@/components/ResultsTable";
import { fetchResults } from "@/lib/api";

export default async function Home() {
  const results = await fetchResults();

  const trend = results.map((item: any) => ({
    date: item.date,
    passed: item.passed || 0,
    failed: item.failed || 0,
  }));

  const passed = results.filter((r) => r.status === "passed").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return <ResultsTable results={results} />;
}

export type TestResult = {
  id: number;
  test_name: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  timestamp: string;
};
