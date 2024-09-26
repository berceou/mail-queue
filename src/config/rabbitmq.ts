import amqp from "amqplib";
import { config } from "./config"; // Genel yapılandırma dosyası

// RabbitMQ bağlantısını oluşturma
export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(config.rabbitMQ.url);
    return connection.createChannel();
  } catch (error) {
    console.error("RabbitMQ bağlantı hatası:", error);
    throw error; // Hata fırlatılarak üst katmanlarda yönetilebilir
  }
};

// Diğer RabbitMQ ile ilgili işlemler burada yer alabilir
