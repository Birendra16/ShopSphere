import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL!)
.then(()=> console.log("MongoDB Connected "))
.catch((err)=>console.error(err));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=>res.send("ShopSphere API Running"));

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))