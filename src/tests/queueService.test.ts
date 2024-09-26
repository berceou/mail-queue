import { sendMailToQueue, consumeMailQueue } from "../services/queueService";
import { connectRabbitMQ } from "../config/rabbitmq";
import { sendMail } from "../services/mailService";
import { Mail } from "../types/mailTypes";

jest.mock("../config/rabbitmq");
jest.mock("../services/mailService");

describe("Queue Service", () => {
  const channelMock = {
    assertQueue: jest.fn(),
    sendToQueue: jest.fn(),
    consume: jest.fn(),
    ack: jest.fn(),
  };

  beforeEach(() => {
    (connectRabbitMQ as jest.Mock).mockResolvedValue(channelMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should send mail to queue", async () => {
    const mail: Mail = {
      to: "test@example.com",
      subject: "Test",
      body: "This is a test email",
    };

    await sendMailToQueue(mail);

    expect(channelMock.assertQueue).toHaveBeenCalledWith("mail_queue");
    expect(channelMock.sendToQueue).toHaveBeenCalledWith(
      "mail_queue",
      Buffer.from(JSON.stringify(mail))
    );
  });

  test("should consume mail from queue and send", async () => {
    const mail: Mail = {
      to: "test@example.com",
      subject: "Test",
      body: "This is a test email",
    };
    channelMock.consume.mockImplementation((queueName, callback) => {
      const msg = {
        content: Buffer.from(JSON.stringify(mail)),
      };
      callback(msg);
    });

    await consumeMailQueue();

    expect(channelMock.assertQueue).toHaveBeenCalledWith("mail_queue");
    expect(sendMail).toHaveBeenCalledWith(mail.to, mail.subject, mail.body);
    expect(channelMock.ack).toHaveBeenCalled();
  });
});
