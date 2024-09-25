import { connectRabbitMQ } from "../config/rabbitmq";
import { sendMail } from "./mailService";

const QUEUE_NAME = "mail_queue";

export const sendMailToQueue = async (mail: {
  to: string;
  subject: string;
  body: string;
}) => {
  const channel = await connectRabbitMQ();
  await channel.assertQueue(QUEUE_NAME);
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(mail)));
  console.log("Mail queued:", mail);
};

export const consumeMailQueue = async () => {
  const channel = await connectRabbitMQ();
  await channel.assertQueue(QUEUE_NAME);

  channel.consume(
    QUEUE_NAME,
    async (msg) => {
      if (msg !== null) {
        const mail = JSON.parse(msg.content.toString());
        await sendMail(mail.to, mail.subject, mail.body);
        channel.ack(msg);
      }
    },
    { noAck: false }
  );
};
