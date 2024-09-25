import { sendMail } from "../services/mailService";
import nodemailer from "nodemailer";

jest.mock("nodemailer");

describe("Mail Service", () => {
  it("should send mail successfully", async () => {
    const sendMailMock = nodemailer.createTransport().sendMail as jest.Mock;
    sendMailMock.mockResolvedValue({ messageId: "123" });

    await sendMail("test@example.com", "Test Subject", "Test Body");
    expect(sendMailMock).toHaveBeenCalled();
  });
});
