import express from "express";
import { sendMail } from "./controllers/mailController";
import {
  addEmailToBlacklist,
  removeEmailFromBlacklist,
} from "./controllers/blackListController";

const app = express();
app.use(express.json());

app.post("/send-mail", sendMail);
app.post("/blacklist/add", addEmailToBlacklist);
app.post("/blacklist/remove", removeEmailFromBlacklist);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
