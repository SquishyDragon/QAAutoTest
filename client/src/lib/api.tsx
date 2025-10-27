import { TestResult } from "@/app/page";

export async function fetchResults() {
  const res = await fetch("https://qaautotest.onrender.com/results", {
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch test results");
  }
  const data = await res.json();
  console.log(data);
  return data as Promise<TestResult[]>;
}
