import { TestResult } from "@/app/page";

export async function fetchResults() {
  const res = await fetch("http://localhost:3000/resutls", {
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch test results");
  }
  const data = await res.json();
  return data as Promise<TestResult[]>;
}
