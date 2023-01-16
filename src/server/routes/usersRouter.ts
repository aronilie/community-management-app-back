import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", getUserById);

usersRouter.put("/:id", updateUser);

usersRouter.post("/create", createUser);

usersRouter.delete("/:id", deleteUser);

export default usersRouter;
