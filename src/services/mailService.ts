import nodemailer from "nodemailer";
import { redisClient } from "../config/redis";
import logger from "../utils/logger";

export const sendMail = async (
  to: string,
  subject: string,
  body: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Mail sent to ${to}`);

    // Redis'e mail bilgisini kaydet
    await redisClient.set(`mail:${to}`, JSON.stringify({ to, subject, body }));
    logger.info(`Mail data saved to Redis for ${to}`);
  } catch (error) {
    logger.error(`Failed to send mail to ${to}: ${error}`);
    throw new Error(`Mail sending failed: ${error}`);
  }
};
