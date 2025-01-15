import express from "express";
import {client}  from "@repo/db/client";
const app = express();
app.listen(8000, () => {        
  console.log("Server is running on port 8000");
});
