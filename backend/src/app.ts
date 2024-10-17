import 'dotenv/config'
import express, { NextFunction, Request, Response } from "express";
// import userRoutes from "./routes/users";
import authRoutes from "./routes/authRoutes";
import itemRoutes from "./routes/itemRoutes";
import createHttpError, { isHttpError } from 'http-errors';

const app = express();

app.use(express.json());

// app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes)

app.use("/api/item", itemRoutes)

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = "An unknown error occured";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app;