import { chromium } from "playwright";
// import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

async function runTests() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Define your Playwright tests here
  const tests = [
    {
      name: "Home page loads",
      fn: async () => {
        await page.goto("https://example.com");
        const title = await page.title();
        if (!title.includes("Example")) throw new Error("Title mismatch");
      },
    },
    // Add more tests as needed
  ];

  const results = [];

  for (const test of tests) {
    const start = Date.now();
    let status = "passed";
    try {
      await test.fn();
    } catch {
      status = "failed";
    }
    const duration = Date.now() - start;
    results.push({
      test_name: test.name,
      status,
      duration,
      timestamp: new Date().toISOString(),
    });
  }
  console.log(process.env.API_URL);

  // Post results to backend
  for (const result of results) {
    await fetch(`${process.env.API_URL}/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result), 
    });
  }

  await browser.close();
  console.log("Nightly Playwright tests completed!");
}

runTests().catch(console.error);
