process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { findOneAndReplace } = require("../models/Task");

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

  it("Should get all user's tasks", async () => {
    for (let i = 1; i <= 2; i++) {
      const testTask = {
        user: "6505e9cf183912c8ddfbdbed",
        text: `Test Task-${i}`,
        completed: false,
        completed_at: null,
        created_at: new Date(),
      };
      await request(app)
        .post("/api/tasks")
        .send(testTask)
        .set("Cookie", [`token=${mockToken}`]);
    }

    let getTaskResponse = await request(app)
      .get(`/api/tasks`)
      .set("Cookie", [`token=${mockToken}`]);

    console.log(getTaskResponse.body);

    expect(getTaskResponse.status).toBe(200);
    for (let i = 0; i < getTaskResponse.body.length; i++) {
      expect(getTaskResponse.body[i]).toHaveProperty(
        "text",
        `Test Task-${i + 1}`
      );
    }
  });
});
