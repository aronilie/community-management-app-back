import mongoose, { model, Schema } from "mongoose";

export interface User {
    userName: string;
    passwd: string;
    debts: number;
    orders: object;
}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    passwd: {
        type: String,
        required: true,
    },
    debts: {
        type: Number,
        required: false,
    },
    receipts: [{ type: Schema.Types.ObjectId, ref: "Receipt" }],
});

export const UserModel = model("User", userSchema, "users");
