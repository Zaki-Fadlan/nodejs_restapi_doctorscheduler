import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: {
  id: string | number;
  username: string;
  name: string;
  role_id?: number;
}): string => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });
};
