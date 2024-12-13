import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const result = await AuthService.register({ email, password, name });

    res.status(201).json({
      message: 'User created successfully',
      ...result
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });

    res.json({
      message: 'Logged in successfully',
      ...result
    });
  } catch (error) {
    next(error);
  }
};