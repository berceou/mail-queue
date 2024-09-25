import { sendMailToQueue } from "./services/queueService";

const mail = {
  to: "recipient@example.com",
  subject: "Test Email",
  body: "This is a test email sent via RabbitMQ",
};

sendMailToQueue(mail)
  .then(() => {
    console.log("Mail sent to queue");
  })
  .catch((err) => {
    console.error("Failed to send mail to queue", err);
  });
