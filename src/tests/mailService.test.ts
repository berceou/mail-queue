import { sendMail } from "../services/mailService";
import nodemailer from "nodemailer";
import { redisClient } from "../config/redis";

jest.mock("nodemailer");
jest.mock("../config/redis");

describe("sendMail", () => {
  const mockTransporter = {
    sendMail: jest.fn(),
  };

  beforeEach(() => {
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);
    (redisClient.set as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email successfully", async () => {
    mockTransporter.sendMail.mockResolvedValueOnce({});

    await sendMail("recipient@example.com", "Subject", "Body");

    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: process.env.MAIL_USER,
      to: "recipient@example.com",
      subject: "Subject",
      text: "Body",
    });
    expect(redisClient.set).toHaveBeenCalledWith(
      expect.stringContaining("mail:recipient@example.com"),
      expect.any(String)
    );
  });

  it("should throw an error when sending fails", async () => {
    mockTransporter.sendMail.mockRejectedValueOnce(new Error("SMTP error"));

    await expect(
      sendMail("recipient@example.com", "Subject", "Body")
    ).rejects.toThrow("Mail sending failed: Error: SMTP error");
  });
});
