import express from "express";
import choresRouter from "./src/router/choresRouter.js";
import usersRouter from "./src/router/usersRouter.js";
import shopsRouter from "./src/router/shopsRouter.js";
import purchaseHistoryRouter from "./src/router/purchaseHistoryRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://choresite-n71r.onrender.com"],
    credentials: true,
  }),
);

// app.options("*", cors());

app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "dist")));

// SET ROUTES HERE
app.use("/api/v1/chores", choresRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/shops", shopsRouter);
app.use("/api/v1/history", purchaseHistoryRouter);

app.use(mongoSanitize());

app.use(xss());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "URL not found!",
  });
});

export default app;
