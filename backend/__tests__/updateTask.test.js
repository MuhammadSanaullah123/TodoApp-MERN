const request = require("supertest");
const app = require("../server"); // Assuming this is your Express app
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const mockToken = jwt.sign(
  { user: { id: "6505e9cf183912c8ddfbdbed" } },
  process.env.VITE_JWT_SECRET
);

describe("PUT /api/tasks/:id", () => {
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

  it("should update an existing task", async () => {
    const testTask = {
      user: "6505e9cf183912c8ddfbdbed",
      text: "Test Task",
      completed: false,
      completed_at: null,
      created_at: new Date(),
    };
    const createResponse = await request(app)
      .post("/api/tasks")
      .send(testTask)
      .set("Cookie", [`token=${mockToken}`]);

    const taskId = createResponse.body._id;

    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ completed: true })
      .set("Cookie", [`token=${mockToken}`]);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty("completed", true);
  });

  it("Should return an error for updating a non-existent task", async () => {
    const updateResponse = await request(app)
      .put("/api/tasks/nonexistentid")
      .send({ completed: true })
      .set("Cookie", [`token=${mockToken}`]);

    expect(updateResponse.status).toBe(404);
  });
});
