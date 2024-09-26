import request from "supertest";
import app from "../app"; // Express app'iniz

describe("API Endpoints", () => {
  test("GET /api/blacklist should return 200", async () => {
    const res = await request(app).get("/api/blacklist");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("blacklist");
  });

  test("POST /api/blacklist should add email", async () => {
    const res = await request(app)
      .post("/api/blacklist")
      .send({ email: "test@example.com" });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("Email added to blacklist");
  });
});
