import { test, expect } from "@playwright/test";

test("mock API GET request", async ({ page }) => {
  // Mock API
  await page.route("**/api/users", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ id: 1, name: "Mocked user" }]),
    });
  });

  // Trigger fetch from the page context
  await page.goto("https://reqres.in");
  const response = await page.evaluate(async () => {
    const res = await fetch("https://reqres.in/api/users");
    return res.json();
  });

  console.log("Mocked response:", response);
  expect(response[0].name).toBe("Mocked user");
});

test("mock fruits API without API calls ", async ({ page }) => {
  // Mock the API call before navigating to the page!
  console.log("Now mocking the same endpoint...");
  await page.route("**/api/v1/fruits", async (route) => {
    // await page.route("**/api/v1/fruits", async (route) => {
    const response = await route.fetch();
    console.log(response.json());
    const json = [{ name: "Strawberry", id: 21 }];
    await route.fulfill({ json });
  });

  // Go to the page:
  console.log("Launching the page on the UI");

  // Assert that Strawberry Fruit is displayed
  await expect(page.getByText("Strawberry")).toBeVisible();
});

test("compare original v/s mocked APi call responses ", async ({ page }) => {
  // --- Step 1: Show the real API response (optional) ---

  const realResponse = await page.request.get(
    "https://demo.playwright.dev/api-mocking/api/v1/fruits"
  );
  console.log("Status:", realResponse.status());
  console.log("\nJSON returned by the Endpoint");
  console.log(await realResponse.json());

  // --- Step 2: Set up the mock route ---
  console.log("\nNow mocking the same endpoint...");
  await page.route("**/api/v1/fruits", async (route) => {
    const json = [{ name: "Strawberry", id: 21 }];
    await route.fulfill({ json });
  });

  // --- Step 3: Trigger fetch *from inside the browser* ---
  const mockedResponse = await page.evaluate(async () => {
    const res = await fetch(
      "https://demo.playwright.dev/api-mocking/api/v1/fruits"
    );
    return res.json();
  });

  console.log("Mocked response:", mockedResponse);

  // --- Step 4: Validate it ---
  expect(mockedResponse[0].name).toBe("Strawberry");
  expect(mockedResponse[0].id).toBe(21);
});
