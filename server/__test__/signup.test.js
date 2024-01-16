const request = require("supertest")
const app = require("../app")

it("fails without username or password provided", async () => {
  // no req.body
  await request(app).post("/user/signup").send({}).expect(400)

  // no password
  await request(app)
    .post("/user/signup")
    .send({
      username: "derp",
    })
    .expect(400)

  // password too short
  await request(app)
    .post("/user/signup")
    .send({
      username: "derp",
      password: "123",
    })
    .expect(400)

  // no username
  await request(app)
    .post("/user/signup")
    .send({
      password: "derp",
    })
    .expect(400)
})
