import amqp from "amqplib";
import { config } from "./config";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(config.rabbitMQ.url);
    return connection.createChannel();
  } catch (error) {
    console.error("RabbitMQ bağlantı hatası:", error);
    throw error;
  }
};
