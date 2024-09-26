import amqp from "amqplib";
import { connectRabbitMQ } from "../config/rabbitmq";
import { config } from "../config/config";
jest.mock("amqplib");

describe("RabbitMQ Connection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully connect to RabbitMQ and create a channel", async () => {
    const mockChannel = {
      /* Channel metodları burada tanımlanabilir */
    };
    (amqp.connect as jest.Mock).mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue(mockChannel),
    });

    const channel = await connectRabbitMQ();

    expect(amqp.connect).toHaveBeenCalledWith(config.rabbitMQ.url);
    expect(channel).toBe(mockChannel);
  });

  test("should throw an error if RabbitMQ connection fails", async () => {
    const errorMessage = "Connection failed";
    (amqp.connect as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(connectRabbitMQ()).rejects.toThrow(errorMessage);
    expect(amqp.connect).toHaveBeenCalledWith(config.rabbitMQ.url);
  });
});
