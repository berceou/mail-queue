import { Request, Response } from "express";
import {
  addToBlacklist,
  removeFromBlacklist,
} from "../services/blackListService";

export const addEmailToBlacklist = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await addToBlacklist(email);
    res.status(200).json({ message: "Email added to blacklist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add email to blacklist", error });
  }
};

export const removeEmailFromBlacklist = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await removeFromBlacklist(email);
    res.status(200).json({ message: "Email removed from blacklist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove email from blacklist", error });
  }
};
