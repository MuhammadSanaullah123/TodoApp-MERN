process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const mockToken = jwt.sign(
  { user: { id: "6505e9cf183912c8ddfbdbed" } },
  process.env.VITE_JWT_SECRET
);

describe("POST /api/tasks", () => {
  let mongo;
  let mongoUri;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  it("Should create a new task", async () => {
    const testTask = {
      user: "6505e9cf183912c8ddfbdbed",
      text: "Test Task",
      completed: false,
      completed_at: null,
      created_at: new Date(),
    };
    const response = await request(app)
      .post("/api/tasks")
      .send(testTask)
      .set("Cookie", [`token=${mockToken}`]);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("text", "Test Task");
  });

  // Invalid input
  it("Should return an error for invalid input", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({})
      .set("Cookie", [`token=${mockToken}`]);

    expect(response.status).toBe(400);
  });
});
