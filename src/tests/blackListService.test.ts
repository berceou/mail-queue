import { redisClient } from "../config/redis";
import "jest";
import {
  addToBlacklist,
  removeFromBlacklist,
  isBlacklisted,
} from "../services/blackListService";

jest.mock("../config/redis", () => ({
  redisClient: {
    set: jest.fn(),
    del: jest.fn(),
    get: jest.fn(),
  },
}));

describe("Blacklist Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should add email to blacklist", async () => {
    const email = "test@example.com";
    (redisClient.set as jest.Mock).mockResolvedValue("OK");

    await addToBlacklist(email);

    expect(redisClient.set).toHaveBeenCalledWith(`blacklist:${email}`, "true");
  });

  test("should remove email from blacklist", async () => {
    const email = "test@example.com";
    (redisClient.del as jest.Mock).mockResolvedValue(1);

    await removeFromBlacklist(email);

    expect(redisClient.del).toHaveBeenCalledWith(`blacklist:${email}`);
  });

  test("should check if email is blacklisted", async () => {
    const email = "test@example.com";
    (redisClient.get as jest.Mock).mockResolvedValue("true");

    const result = await isBlacklisted(email);

    expect(redisClient.get).toHaveBeenCalledWith(`blacklist:${email}`);
    expect(result).toBe(true);
  });

  test("should return false if email is not blacklisted", async () => {
    const email = "test@example.com";
    (redisClient.get as jest.Mock).mockResolvedValue(null);

    const result = await isBlacklisted(email);

    expect(redisClient.get).toHaveBeenCalledWith(`blacklist:${email}`);
    expect(result).toBe(false);
  });
});
