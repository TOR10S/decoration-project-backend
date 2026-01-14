import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar.js";

export const loginService = async ({ password }) => {
  if (!password) {
    const error = new Error("Password is required");
    error.status = 400;
    throw error;
  }

  const passwordHash = getEnvVar("ADMIN_PASSWORD");
  const jwtSecret = getEnvVar("JWT_SECRET");

  const isValidPassword = await bcrypt.compare(password, passwordHash);

  if (!isValidPassword) {
    const error = new Error("Wrong password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { role: "admin" },
    jwtSecret,
    { expiresIn: "1d" }
  );

  return token;
};
