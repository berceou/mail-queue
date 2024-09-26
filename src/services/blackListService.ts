import { redisClient } from "../config/redis";

// Kara listeye e-posta ekle
export const addToBlacklist = async (email: string) => {
  await redisClient.set(`blacklist:${email}`, "true");
  console.log(`Email added to blacklist: ${email}`);
};

// Kara listeden e-posta sil
export const removeFromBlacklist = async (email: string) => {
  await redisClient.del(`blacklist:${email}`);
  console.log(`Email removed from blacklist: ${email}`);
};

// E-posta adresinin kara listede olup olmadığını kontrol et
export const isBlacklisted = async (email: string): Promise<boolean> => {
  const result = await redisClient.get(`blacklist:${email}`);
  return result !== null; // Eğer sonuç null değilse, e-posta kara listede
};
