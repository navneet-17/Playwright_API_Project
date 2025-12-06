// import { test, expect } from "@playwright/test";
// import userData from "../resources/userRequestPayload.json" assert { type: "json" };

// test("POST request from Payload", async ({ request }) => {
//   //Do as we did earlier to perform the POST request:
//   const response = await request.post("https://reqres.in/api/users", {
//     headers: {
//       "x-api-key": "reqres-free-v1",
//       "Content-Type": "application/json",
//     },
//     data: {
//       name: userData.name,
//       job: userData.job,
//     },
//   });

//   console.log(response.status());
//   expect(response.status()).toBe(201);
//   const responseJson = await response.json();
//   console.log(responseJson);
//   expect(responseJson.name).toEqual(userData.name);
//   expect(responseJson.job).toEqual(userData.job);
// });
