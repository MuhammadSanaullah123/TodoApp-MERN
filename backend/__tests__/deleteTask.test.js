const request = require("supertest");
const app = require("../server"); // Assuming this is your Express app
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const mockToken = jwt.sign(
  { user: { id: "6505e9cf183912c8ddfbdbed" } },
  process.env.VITE_JWT_SECRET
);

describe("DELETE /api/tasks/:id", () => {
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

  it("should delete an existing task", async () => {
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

    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Cookie", [`token=${mockToken}`]);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty("msg", "Task removed");
  });

  it("Should return an error for trying to delete a non-existent task", async () => {
    const deleteResponse = await request(app)
      .delete("/api/tasks/nonexistentid")
      .set("Cookie", [`token=${mockToken}`]);

    expect(deleteResponse.status).toBe(404);
  });
});
