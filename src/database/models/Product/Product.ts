import mongoose, { model } from "mongoose";

export interface Product {
    name: string;
    wasted: boolean;
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    wasted: {
        type: Boolean,
        required: false,
        default: false,
    },
});

export const ProductModel = model("Product", productSchema, "products");
