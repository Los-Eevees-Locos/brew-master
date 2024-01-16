const request = require("supertest")
const app = require("../app")

it("Clears cookie on signout", async () => {
  const response = await request(app).post("/user/signout").send({}).expect(200)

  console.log("🍪 COOOOKIE: ", response.get("Set-Cookie"))
  expect(response.get("Set-Cookie")).toBeDefined()
})
