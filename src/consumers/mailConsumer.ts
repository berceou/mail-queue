import { consumeMailQueue } from "../services/queueService";
import logger from "../utils/logger";

consumeMailQueue()
  .then(() => {
    logger.info("Mail queue consumer started");
  })
  .catch((err) => {
    logger.error(`Failed to start mail queue consumer: ${err}`);
  });
