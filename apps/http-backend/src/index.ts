import express from "express";
import { authRouter } from "./routes/auth.js"; 

const app = express();

app.use(express.json());

app.use('/v1', authRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
