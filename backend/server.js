import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'; 


//Basic configaration and connection establishment
dotenv.config();
connectDB();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(userRoutes);





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
