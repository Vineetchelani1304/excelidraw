import express from "express";
import { authRouter } from "./routes/auth.js"; 
import { roomRouter } from "./routes/room.js";

const app = express();

app.use(express.json());

app.use('/v1/auth', authRouter);
app.use("/", roomRouter); 

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
