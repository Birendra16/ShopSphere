import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL!)
.then(()=> console.log("MongoDB Connected "))
.catch((err)=>console.error(err));

app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))