import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";


const app = express();
const port = 4000;

connectDB();
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("FinManager Server is working");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
