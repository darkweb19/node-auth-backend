import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is running great!!!");
});
// Routes
app.use("/api/auth", authRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
