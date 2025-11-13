import { test, expect } from "@playwright/test";
import { UserPayload } from "../dataModels/userPayload";

test("User Payload from Data Model", async ({ request }) => {
  // Create an object structure
  const user: UserPayload = {
    name: "Morpheus",
    job: "leader",
    skills: ["Python"],
    address: {
      street: "123, Drive Through",
      city: "Seattle",
    },
  };

  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "x-api-key": "reqres-free-v1",
      "Content-Type": "application/json",
    },
    data: user,
  });

  console.log(response.status());
  expect(response.status()).toBe(201);
  const responseJson = await response.json();
  console.log(responseJson);

  expect(responseJson.name).toEqual(user.name);
  expect(responseJson.job).toEqual(user.job);
  expect(responseJson.skills).toEqual(user.skills);
  expect(responseJson.address).toEqual(user.address);
  // verify if the city name is 'Seattle'
  expect(responseJson.address.city).toEqual("Seattle");
  console.log("City name:", responseJson.address.city);
});
