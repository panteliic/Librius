const request = require("supertest");

import app from "../src/app";
import { AppDataSource } from "../src/data-source";

describe("Favorites Routes", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("should add book to favorites (POST /api/addFavorites)", async () => {
    const response = await request(app)
      .post("/api/addFavorites")
      .send({
        bookId: 1402,
        userId: 3,
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Book added to favorites");
  });

  it("should return 404 if user or book is not found", async () => {
    const response = await request(app)
      .post("/api/addFavorites")
      .send({ bookId: "9999", userId: "9999" })
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User or book not found");
  });

  it("should not allow duplicate favorites (POST /api/addFavorites)", async () => {
    await request(app)
      .post("/api/addFavorites")
      .send({ bookId: "1402", userId: "3" })
      .set("Accept", "application/json");

    const response = await request(app)
      .post("/api/addFavorites")
      .send({ bookId: "1402", userId: "3" })
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Book already in favorites");
  });

  it("should return 500 on server error", async () => {
    jest
      .spyOn(AppDataSource.getRepository("Favorites"), "save")
      .mockRejectedValue(new Error("DB error"));

    const response = await request(app)
      .post("/api/addFavorites")
      .send({ bookId: "1402", userId: "3" })
      .set("Accept", "application/json");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");
  });
});
