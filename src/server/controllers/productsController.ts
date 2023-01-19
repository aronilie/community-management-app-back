import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../database/models/Product/Product";
import CustomError from "../../errors/CustomError";

export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ products });
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error loading products.",
            "Error loading products."
        );
        next(finalError);
    }
};

export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const product = await ProductModel.findById(id);
        res.status(200).json(product);
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error finding product.",
            "Error finding product."
        );
        next(finalError);
    }
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { name, wasted } = req.body;

    try {
        await ProductModel.updateOne({ _id: id }, { $set: { name, wasted } });
        res.status(201).json("Product successfully updated.");
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error updating product.",
            "Error updating product."
        );
        next(finalError);
    }
};

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const product = req.body;

    try {
        await ProductModel.create(product);
        res.status(201).json("Product successfully created.");
    } catch (error) {
        const creationError = new CustomError(
            400,
            "Error creating product.",
            "Error creating product"
        );
        next(creationError);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        await ProductModel.findByIdAndDelete(id);
        res.status(201).json("Product successfully deleted.");
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error deleting product.",
            "Error deleting product."
        );
        next(finalError);
    }
};
