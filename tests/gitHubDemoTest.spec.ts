import { test, expect, APIRequestContext, request } from "@playwright/test";
import GithubDetails from "../credentials/GitHub_Credentials.json" assert { type: "json" };

const REPO = GithubDetails.repo;
const USER = GithubDetails.user;
const GITHUB_TOKEN = GithubDetails.token;

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: "https://api.github.com",
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      Accept: "application/vnd.github.v3+json",
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
});

test.afterAll(async ({}) => {
  // Dispose all responses.
  await apiContext.dispose();
});

test("last created issue should be first in the provided list", async ({
  page,
}) => {
  const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: "[Feature] testRequest 7",
    },
  });
  expect(newIssue.ok()).toBeTruthy();

  await page.goto(`https://github.com/${USER}/${REPO}/issues`);

  // 1. Create the locator "recipe". Do NOT use await here.
  const firstIssueOnPage = page
    .locator('a[data-testid="issue-pr-title-link"]')
    .first();

  // 2. Pass the locator directly to expect.
  await expect(firstIssueOnPage).toHaveText("[Feature] testRequest 7", {
    timeout: 15000,
  });
});
