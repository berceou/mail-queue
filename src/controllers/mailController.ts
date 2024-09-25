import { Request, Response } from "express";
import { sendMailToQueue } from "../services/queueService";

export const sendMail = async (req: Request, res: Response) => {
  const { to, subject, body } = req.body;

  try {
    await sendMailToQueue({ to, subject, body });
    res.status(200).json({ message: "Mail successfully queued" });
  } catch (error) {
    res.status(500).json({ message: "Failed to queue mail", error });
  }
};
