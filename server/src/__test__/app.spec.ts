import request from "supertest";
import { app } from "../app";

jest.mock("csrf-csrf");

describe("POST /data", () => {
  it("should respond with success", async () => {
    const response = await request(app).post("/data");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "Success" });
  });
});
