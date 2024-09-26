import { redisClient } from "../config/redis";

export const addToBlacklist = async (email: string) => {
  await redisClient.set(`blacklist:${email}`, "true");
  console.log(`Email added to blacklist: ${email}`);
};

export const removeFromBlacklist = async (email: string) => {
  await redisClient.del(`blacklist:${email}`);
  console.log(`Email removed from blacklist: ${email}`);
};

export const isBlacklisted = async (email: string): Promise<boolean> => {
  const result = await redisClient.get(`blacklist:${email}`);
  return result !== null; // If resp is not null, the mail is in blacklist
};
