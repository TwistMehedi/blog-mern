import express from "express";
import env from "dotenv";
import connectDb from "./utils/connectDb.js";
import userRouter from "./routes/userRoute.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";

env.config();

const app = express();

app.use(express());
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
 await connectDb();
  console.log(`Port number is runing ${port}`);
});
