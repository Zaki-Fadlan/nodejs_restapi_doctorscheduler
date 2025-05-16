import { UserModel } from "../models/user";
import { LoginDTO, UserDTO } from "../types/user";
import { generateToken, comparePassword } from "../utils/auth";

export class AuthService {
  static async register(userData: UserDTO) {
    const existingUser = await UserModel.findByUsername(userData.username);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await UserModel.createUser({
      ...userData,
    });

    const token = generateToken({
      id: user.id,
      username: user.username,
      name: user.name,
      role_id: user.role_id,
    });

    return { user, token };
  }

  static async login(loginData: LoginDTO) {
    const user = await UserModel.findByUsername(loginData.username);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(
      loginData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      name: user.name,
      role_id: user.role_id,
    });

    return { user, token };
  }

  static async getUserProfile(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
