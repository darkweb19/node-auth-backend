"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../config/database"));
const jwt_1 = require("../config/jwt");
class AuthService {
    static async register(data) {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await database_1.default.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        const token = (0, jwt_1.generateToken)(user.id);
        return { user, token };
    }
    static async login(data) {
        const user = await database_1.default.user.findUnique({
            where: { email: data.email }
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValidPassword = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }
        const token = (0, jwt_1.generateToken)(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token,
        };
    }
}
exports.AuthService = AuthService;
