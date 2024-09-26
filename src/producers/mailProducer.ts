import { sendMailToQueue } from "../services/queueService";
import logger from "../utils/logger";

const mail = {
  to: "berceozumtest@example.com",
  subject: "Test Email",
  body: "This is a test email sent via RabbitMQ",
};

sendMailToQueue(mail)
  .then(() => {
    logger.info("Mail sent to queue");
  })
  .catch((err) => {
    logger.error(`Failed to send mail to queue: ${err}`);
  });
