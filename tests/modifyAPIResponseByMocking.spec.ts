import { test, expect } from "@playwright/test";

test("gets the json from api and adds a new fruit", async ({ page }) => {
  // Intercept API call
  await page.route("**/api/v1/fruits", async (route) => {
    // Fetch the original (real) response
    const response = await route.fetch();
    const json = await response.json();

    // Modify / append new data to the response
    json.push({ name: "Litchi", id: 101 });

    // Fulfill using the original response, but with modified JSON body
    console.log("Response: ", await response.json());
    console.log("\n");
    console.log("Response post inserting my json: ", json);
    await route.fulfill({ response, json });
  });

  // Navigate to the demo page that makes the API call
  await page.goto("https://demo.playwright.dev/api-mocking");

  // Assertion – the new fruit we injected should now be visible
  await expect(page.getByText("Litchi", { exact: true })).toBeVisible();
});
