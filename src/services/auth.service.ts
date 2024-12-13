import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateToken } from '../config/jwt';
import { UserCreateInput, UserLoginInput } from '../types/auth.types';

export class AuthService {
  static async register(data: UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
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

    const token = generateToken(user.id);

    return { user, token };
  }

  static async login(data: UserLoginInput) {
    const user = await prisma.user.findUnique({ 
      where: { email: data.email } 
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);

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