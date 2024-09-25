import amqp from "amqplib";
import Redis from "ioredis";

// RabbitMQ bağlantısı
export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost"
  );
  return connection.createChannel();
};

// Redis bağlantısı
export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
});

redisClient.on("connect", () => {
  console.log("Redis connected!");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});
