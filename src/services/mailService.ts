import nodemailer from "nodemailer";
import { redisClient } from "../config/rabbitmq";

export const sendMail = async (to: string, subject: string, body: string) => {
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

  await transporter.sendMail(mailOptions);
  console.log("Mail sent:", to);

  // Redis'e mail bilgisini kaydet
  await redisClient.set(`mail:${to}`, JSON.stringify({ to, subject, body }));
};
