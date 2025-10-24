import fs from "fs";
import axios from "axios";

const results = JSON.parse(fs.readFileSync("results.json", "utf8"));

// path to info results.suites[0].specs[0].tests[0].results

const summaries = results.suites.flatMap((suite) =>
  suite.specs.flatMap((spec) => {
    return spec.tests.map((test) => {
      const result = test.results[0];

      return {
        test_name: spec.title,
        status: result.status,
        duration: result.duration,
        timestamp: new Date().toISOString(),
      };
    });
  })
);

sendResults(summaries);

// Send results to the API
async function sendResults(summaries) {
  for (const test of summaries) {
    try {
      await axios.post("http://localhost:3000/resutls", test);
      console.log(`✅ Saved: ${test.test_name} (${test.status})`);
    } catch (err) {
      console.error(`❌ Failed to save ${test.test_name}`, err.message);
    }
  }
}
