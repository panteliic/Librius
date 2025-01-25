const request = require("supertest");
import app from "../src/app"; // Putanja do tvog Express app fajla
import { AppDataSource } from "../src/data-source";

describe("App Test Suite", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("should respond with status 200 on GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
