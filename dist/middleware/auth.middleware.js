"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../config/jwt");
const authenticate = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;
