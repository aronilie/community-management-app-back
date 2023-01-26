import { model, Schema } from "mongoose";

export interface Receipt {
    owner: string;
    product: string;
    image: string;
    price: string;
    date: string;
}

const receiptSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
});

export const ReceiptModel = model("Receipt", receiptSchema, "receipts");
