import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/productsController";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getProductById);

productsRouter.put("/:id", updateProduct);

productsRouter.post("/create", createProduct);

productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
