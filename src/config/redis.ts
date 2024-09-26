import Redis from "ioredis";
import { config } from "./config"; // Genel yapılandırma dosyası

// Redis bağlantısını oluşturma
export const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

// Redis bağlantı olayları
redisClient.on("connect", () => {
  console.log("Redis connected!");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});
