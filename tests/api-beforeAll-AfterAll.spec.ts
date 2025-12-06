import { test, APIRequestContext, expect } from "@playwright/test";

let apiContext: APIRequestContext;

interface User {
  name: string;
  job: string;
}

// test.beforeAll(async ({ playwright }) => {
//   apiContext = await playwright.request.newContext({
//     baseURL: "https://reqres.in",
//     extraHTTPHeaders: {
//       "Content-Type": "application/json",
//       "x-api-key": "reqres-free-v1", // API key per request
//     },
//   });
// });

// test.afterAll(async () => {
//   await apiContext.dispose();
// });

// test("Create user and validate response", async ({ page }) => {
//   const user: User = { name: "Neo", job: "The One" };

//   // 1️⃣ Create a new user (POST)
//   const postResponse = await apiContext.post("/api/users", {
//     data: user,
//   });

//   expect(postResponse.status()).toBe(201);
//   const createdUser = await postResponse.json();
//   console.log("POST Response:", createdUser);
// });
