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
      <section className="snap-start min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 px-6 py-12 md:py-0">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">QA Insight</h1>
          <h2 className="text-lg sm:text-xl text-gray-600 mb-6">
            Automated Test Reporting Dashboard by Nathan Treadaway
          </h2>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            QA Insight automates end-to-end software testing with Playwright and
            visualizes results in real time. Built to show how automation,
            observability, and reliability can come together in a single
            platform.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            I'm <strong>Nathan Treadaway</strong>, a QA Engineer passionate
            about building reliable software through testing and automation.
            This project demonstrates a full QA pipeline — backend, frontend,
            and infrastructure — all working together.
          </p>
        </div>
      </section>

      <section className="snap-start min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-0">
        <div className="flex flex-row items-center justify-center w-[90%] max-w-6xl gap-12">
          <SummaryCard total={results.length} passed={passed} failed={failed} />

          <div className="w-1/3 text-center text-white">
            <h2 className="text-2xl font-semibold mb-4 underline">
              About Your Tests
            </h2>
            <p className="text-white-700 mb-2">
              This dashboard shows the results of your automated tests using
              Playwright.
            </p>
            <p className="text-white-700">
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

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
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
