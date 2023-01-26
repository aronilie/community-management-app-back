import { NextFunction, Request, Response } from "express";
import { ReceiptModel } from "../../database/models/Receipt/Receipt";
import CustomError from "../../errors/CustomError";

export const getAllReceipts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const receipts = await ReceiptModel.find();
        res.status(200).json({ receipts });
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error loading receipts.",
            "Error loading receipts."
        );
        next(finalError);
    }
};

export const getReceiptsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const receipts = await ReceiptModel.find({
            owner: id,
        }).populate("owner");

        res.status(200).json({ receipts });
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error loading receipts.",
            "Error loading receipts."
        );
        next(finalError);
    }
};

export const getReceiptsByProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const receipts = await ReceiptModel.find({
            product: id,
        }).populate("product");

        res.status(200).json({ receipts });
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error loading receipts.",
            "Error loading receipts."
        );
        next(finalError);
    }
};

export const createReceipt = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const receipt = req.body;

    try {
        await ReceiptModel.create(receipt);
        res.status(201).json("Receipt successfully created.");
    } catch (error) {
        const creationError = new CustomError(
            400,
            "Error creating receipt.",
            "Error creating receipt"
        );
        next(creationError);
    }
};
