import mongoose, { model, Schema } from "mongoose";

export interface Product {
    name: string;
    wasted: boolean;
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    wasted: {
        type: Boolean,
        required: false,
        default: false,
    },
    receipts: [{ type: Schema.Types.ObjectId, ref: "Receipt" }],
});

export const ProductModel = model("Product", productSchema, "products");
