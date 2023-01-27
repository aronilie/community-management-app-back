/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../database/models/User/User";
import CustomError from "../../errors/CustomError";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await UserModel.find().populate("receipts");
        res.status(200).json({ users });
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error loading users.",
            "Error loading users."
        );
        next(finalError);
    }
};

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error finding user.",
            "Error finding user."
        );
        next(finalError);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { userName, passwd, debts } = req.body;

    try {
        await UserModel.updateOne(
            { _id: id },
            { $set: { userName, passwd, debts } }
        );
        res.status(201).json("User successfully updated.");
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error updating user.",
            "Error updating user."
        );
        next(finalError);
    }
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.body;

    try {
        await UserModel.create(user);
        res.status(201).json("User successfully created.");
    } catch (error) {
        const creationError = new CustomError(
            400,
            "Error creating user.",
            "Error creating user"
        );
        next(creationError);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        await UserModel.findByIdAndDelete(id);
        res.status(201).json("User successfully deleted.");
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error deleting user.",
            "Error deleting user."
        );
        next(finalError);
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const credentials = req.body;

    try {
        const userFound = await UserModel.findOne({
            userName: credentials.userName,
            passwd: credentials.passwd,
        });

        if (!userFound) throw new Error("Invalid username or password.");

        res.status(200).json(userFound);
    } catch (error) {
        const finalError = new CustomError(
            400,
            error.message,
            "Error logging in."
        );
        next(finalError);
    }
};

export const updateUserDebts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { amount } = req.body;

    let purchaseAmount = amount;

    if (typeof amount === "string") {
        purchaseAmount = parseFloat(amount.replace(",", "."));
    }
    try {
        const allUsers = await UserModel.find().populate("receipts");

        const user = allUsers.find((u) => u.id === id);

        let remainingDebt = purchaseAmount;
        if (user.debts && user.debts > 0) {
            if (user.debts > purchaseAmount) {
                const quantitity = user.debts - purchaseAmount;
                await UserModel.updateOne(
                    { _id: id },
                    { $set: { debts: quantitity } }
                );
            } else {
                remainingDebt -= user.debts;
                await UserModel.updateOne({ _id: id }, { $set: { debts: 0 } });
            }
        }
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id !== id) {
                const quantity =
                    allUsers[i].debts + remainingDebt / (allUsers.length - 1);
                await UserModel.updateOne(
                    { _id: allUsers[i].id },
                    { $set: { debts: quantity } }
                );
            }
        }

        res.status(201).json("User successfully updated.");
    } catch (error) {
        const finalError = new CustomError(
            400,
            "Error updating user.",
            "Error updating user."
        );
        next(finalError);
    }
};
