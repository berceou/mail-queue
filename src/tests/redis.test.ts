import Redis from "ioredis";
import { redisClient } from "../config/redis";
import { config } from "../config/config";

jest.mock("ioredis");

describe("Redis Client", () => {
  let mockRedisInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRedisInstance = { on: jest.fn() };
    (Redis as unknown as jest.Mock).mockImplementation(() => mockRedisInstance);
  });

  test("should create a Redis client with correct configuration", () => {
    expect(Redis).toHaveBeenCalledWith({
      host: config.redis.host,
      port: config.redis.port,
    });
  });

  test("should handle Redis connect event", () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    mockRedisInstance.on.mockImplementation(
      (event: string, callback: () => void) => {
        if (event === "connect") {
          callback();
        }
      }
    );

    redisClient;

    expect(consoleLogSpy).toHaveBeenCalledWith("Redis connected!");
  });

  test("should handle Redis error event", () => {
    const consoleErrorSpy = jest.spyOn(console, "error"); 

    const mockError = new Error("Connection error");
    mockRedisInstance.on.mockImplementation(
      (event: string, callback: (err: Error) => void) => {
        if (event === "error") {
          callback(mockError);
        }
      }
    );

    redisClient;

    expect(consoleErrorSpy).toHaveBeenCalledWith("Redis error:", mockError);
  });
});
