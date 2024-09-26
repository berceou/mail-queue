import { connectRabbitMQ } from "../config/rabbitmq";
import { sendMail } from "./mailService";
import logger from "../utils/logger";
import { Mail } from "../types/mailTypes";

const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME || "mail_queue";

export const sendMailToQueue = async (mail: Mail): Promise<void> => {
  try {
    const channel = await connectRabbitMQ();
    await channel.assertQueue(QUEUE_NAME);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(mail)));
    logger.info(`Mail queued: ${JSON.stringify(mail)}`);
  } catch (error) {
    logger.error(`Failed to queue mail: ${error}`);
    throw new Error(`Failed to queue mail: ${error}`);
  }
};

export const consumeMailQueue = async (): Promise<void> => {
  try {
    const channel = await connectRabbitMQ();
    await channel.assertQueue(QUEUE_NAME);

    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (msg !== null) {
          const mail: Mail = JSON.parse(msg.content.toString());
          await sendMail(mail.to, mail.subject, mail.body);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
    logger.info(`Started consuming mail queue`);
  } catch (error) {
    logger.error(`Failed to consume mail queue: ${error}`);
    throw new Error(`Failed to consume mail queue: ${error}`);
  }
};
