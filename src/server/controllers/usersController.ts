import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../database/models/User/User";
import CustomError from "../../errors/CustomError";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await UserModel.find();
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
    const { name, age, email } = req.body;

    try {
        await UserModel.updateOne({ _id: id }, { $set: { name, age, email } });
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

// export const login = (req: Request, res: Response) => {
//     const credentials = userSchema(req.body);
// };
