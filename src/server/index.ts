import cors from "cors";
import morgan from "morgan";
import express from "express";
import { generalError, notFoundError } from "../errors/generalError";
import usersRouter from "./routes/usersRouter";
import productsRouter from "./routes/productsRouter";
import receiptsRouter from "./routes/receiptsRouter";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/receipts", receiptsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
