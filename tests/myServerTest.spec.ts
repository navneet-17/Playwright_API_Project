import { test, expect, request as playwrightRequest } from "@playwright/test";

// Make sure to add 'request' to your test's arguments
test("Add user via API and verify in UI", async ({ page }) => {
  // Step 1: API context
  const apiContext = await playwrightRequest.newContext({
    baseURL: "http://localhost:3000",
  });

  // Step 2: POST new userprofile
  const userData = {
    name: "Nav",
    profile: "SDET Architect",
    skills: "Selenium, Playwright, API Testing",
    location: "Ind",
  };
  const response = await apiContext.post("/users", { data: userData });
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();

  // Step 3: Open UI
  await page.goto("http://127.0.0.1:5500/myServer/index.html");

  // Step 4: Locate the specific row for the user
  const userRow = page.locator("#users-table-body tr", {
    has: page.getByText(userData.name),
  });

  // Step 5: Wait for the row to be visible
  await expect(userRow).toBeVisible({ timeout: 10000 });

  // Step 6: (Recommended) Verify all data in that specific row
  // We grab all <td> (cell) elements *within* our user's row
  const cells = userRow.locator("td");

  // Assert each cell has the correct text
  await expect(cells.nth(0)).toHaveText(userData.name);
  await expect(cells.nth(1)).toHaveText(userData.profile);
  await expect(cells.nth(2)).toHaveText(userData.skills);
  await expect(cells.nth(3)).toHaveText(userData.location);

  // Step 7: Clean up the API context
  await apiContext.dispose();
});
