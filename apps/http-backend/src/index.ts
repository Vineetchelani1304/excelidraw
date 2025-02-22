import express from "express";
import cors from "cors"; // Import cors middleware
import { authRouter } from "./routes/auth.js"; 
import { roomRouter } from "./routes/room.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for handling cross-origin requests

// Routes
app.use('/v1', authRouter);
app.use("/v1", roomRouter); 

// Start the server
app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
