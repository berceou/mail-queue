import express from "express";
import { sendMail } from "./controllers/mailController";

const app = express();
app.use(express.json());

app.post("/send-mail", sendMail);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
