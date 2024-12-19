"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server is running great!!!");
});
// Routes
app.use("/api/auth", auth_routes_1.default);
// Error handling
app.use(error_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
