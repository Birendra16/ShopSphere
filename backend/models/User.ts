import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
    name: { 
        type: String, 
        required: true,
        minlength: 2 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: "customer" },
    },
    {timestamps: true}
);

export default mongoose.model<IUser>("User", userSchema);