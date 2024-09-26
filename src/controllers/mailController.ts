import { Request, Response } from "express";
import { sendMailToQueue } from "../services/queueService";
import { isBlacklisted } from "../services/blackListService";

export const sendMail = async (req: Request, res: Response) => {
  const { to, subject, body } = req.body;

  try {
    const blacklisted = await isBlacklisted(to);
    if (blacklisted) {
      return res
        .status(403)
        .json({ message: "Email is blacklisted and cannot be sent" });
    }

    await sendMailToQueue({ to, subject, body });
    res.status(200).json({ message: "Mail successfully queued" });
  } catch (error) {
    res.status(500).json({ message: "Failed to queue mail", error });
  }
};
