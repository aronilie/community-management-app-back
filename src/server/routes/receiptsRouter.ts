import express from "express";
import {
    createReceipt,
    getAllReceipts,
    getReceiptsByProduct,
    getReceiptsByUser,
} from "../controllers/receiptsController";

const receiptsRouter = express.Router();

receiptsRouter.get("/", getAllReceipts);

receiptsRouter.get("/user/:id", getReceiptsByUser);

receiptsRouter.get("/product/:id", getReceiptsByProduct);

receiptsRouter.post("/create", createReceipt);

export default receiptsRouter;
