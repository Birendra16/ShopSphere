import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:process.env.CLIENT_URL || "http://localhost:300",
        credentials: true,
    }));

mongoose.connect(process.env.DATABASE_URL!)
.then(()=> console.log("MongoDB Connected "))
.catch((err)=>console.error(err));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))