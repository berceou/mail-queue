import dotenv from "dotenv";

dotenv.config();

export const config = {
  rabbitMQ: {
    url: process.env.RABBITMQ_URL || "amqp://localhost",
    queueName: process.env.RABBITMQ_QUEUE_NAME || "emailQueue",
  },
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
  app: {
    port: process.env.PORT || 3000,
  },
};
