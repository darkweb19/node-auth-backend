"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const result = await auth_service_1.AuthService.register({ email, password, name });
        res.status(201).json({
            message: 'User created successfully',
            ...result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await auth_service_1.AuthService.login({ email, password });
        res.json({
            message: 'Logged in successfully',
            ...result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
