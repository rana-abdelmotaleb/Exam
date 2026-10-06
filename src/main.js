import express from "express";
import { env } from "./config/env.service.js";
import { databaseConnection } from "./database/connection.js";
import authRouter from "./module/auth/auth.controller.js";
import bookRouter from "./module/booking/book.controller.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/book", bookRouter);
databaseConnection();
app.use((err, req, res, next) => {
  res.status(err.cause?.status || 500).json({
    message: err.message,
  });
});

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
