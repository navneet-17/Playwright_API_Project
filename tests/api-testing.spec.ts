import { test, expect } from "@playwright/test";

// test("GET users", async ({ request }) => {
//   const apiResponse = await request.get("https://reqres.in/api/users/?page=2", {
//     headers: {
//       "x-api-key": "reqres-free-v1",
//       "Content-Type": "application/json",
//     },
//   });

//   console.log(apiResponse.status());
//   expect(apiResponse.status()).toEqual(200);
//   const responseBody = await apiResponse.json();
//   const dataReturned = responseBody.data;
//   console.log(dataReturned.length);
//   expect(dataReturned.length).toEqual(6);
//   console.log(dataReturned[0].email);
// });

// test("Delete a user", async ({ request }) => {
//   const apiResponse = await request.delete("https://reqres.in/api/users/1", {
//     headers: {
//       "x-api-key": "reqres-free-v1",
//       "Content-Type": "application/json",
//     },
//   });

//   expect(apiResponse.status()).toEqual(204);
//   console.log(
//     "Successfully Deleted the user and got status code ",
//     apiResponse.status()
//   );
// });

// test("POST: create a user", async ({ request }) => {
//   const userName = "Navneet Shree";
//   const apiResponse = await request.post("https://reqres.in/api/users", {
//     headers: {
//       "x-api-key": "reqres-free-v1",
//       "Content-Type": "application/json",
//     },
//     data: {
//       name: userName,
//       job: "SDET",
//     },
//   });

//   expect(apiResponse.status()).toEqual(201);
//   console.log(
//     "Successfully created the user and got status code ",
//     apiResponse.status()
//   );

//   const responseJson = await apiResponse.json();
//   console.log(responseJson);
//   expect(responseJson.name).toEqual(userName);
// });

// test("PUT: update a user", async ({ request }) => {
//   const updatedUserName = "Mr. Navneet Shree";
//   const apiResponse = await request.put("https://reqres.in/api/users/2", {
//     headers: {
//       "x-api-key": "reqres-free-v1",
//       "Content-Type": "application/json",
//     },
//     data: {
//       name: updatedUserName,
//       job: "SDET",
//     },
//   });

//   expect(apiResponse.status()).toEqual(200);
//   console.log(
//     "Successfully updated the user details and got status code ",
//     apiResponse.status()
//   );

//   const responseJson = await apiResponse.json();
//   console.log(responseJson);
//   expect(responseJson.name).toEqual(updatedUserName);
// });

// test("PATCH: update only few fields for the user", async ({ request }) => {
//   const updatedUserJob = "SDET / TEST ARCHITECT";
//   const apiResponse = await request.patch("https://reqres.in/api/users/2", {
//     headers: {
//       "x-api-key": "reqres-free-v1",
//       "Content-Type": "application/json",
//     },
//     data: {
//       job: updatedUserJob,
//     },
//   });

//   expect(apiResponse.status()).toEqual(200);
//   console.log(
//     "Successfully updated the user details and got status code ",
//     apiResponse.status()
//   );

//   const responseJson = await apiResponse.json();
//   console.log(responseJson);
//   expect(responseJson.job).toEqual(updatedUserJob);
// });
