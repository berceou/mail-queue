import { consumeMailQueue } from "./services/queueService";

consumeMailQueue()
  .then(() => {
    console.log("Mail queue consumer started");
  })
  .catch((err) => {
    console.error("Failed to start mail queue consumer", err);
  });
