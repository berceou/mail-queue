import {
  addToBlacklist,
  removeFromBlacklist,
  isBlacklisted,
} from "../services/blackListService";
import { redisClient } from "../config/redis";

jest.mock("../config/redis");

describe("blacklistService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add an email to the blacklist", async () => {
    await addToBlacklist("test@example.com");
    expect(redisClient.set).toHaveBeenCalledWith(
      "blacklist:test@example.com",
      "true"
    );
  });

  it("should remove an email from the blacklist", async () => {
    await removeFromBlacklist("test@example.com");
    expect(redisClient.del).toHaveBeenCalledWith("blacklist:test@example.com");
  });

  it("should return true if an email is blacklisted", async () => {
    (redisClient.get as jest.Mock).mockResolvedValueOnce("true");

    const result = await isBlacklisted("test@example.com");
    expect(result).toBe(true);
  });

  it("should return false if an email is not blacklisted", async () => {
    (redisClient.get as jest.Mock).mockResolvedValueOnce(null);

    const result = await isBlacklisted("test@example.com");
    expect(result).toBe(false);
  });
});
