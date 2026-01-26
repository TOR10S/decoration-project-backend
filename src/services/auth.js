import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar.js";
import createHttpError from "http-errors";

export const loginService = async ({ password }) => {
  if (!password) {
    throw createHttpError(400, "Password is required");
  }

  const passwordHash = getEnvVar("ADMIN_PASSWORD");
  const jwtSecret = getEnvVar("JWT_SECRET");

  const isValidPassword = await bcrypt.compare(password, passwordHash);

  if (!isValidPassword) {
    throw createHttpError(401, "Wrong password");
  }

  const token = jwt.sign(
    { role: "admin" },
    jwtSecret,
    { expiresIn: "1d" }
  );

  return token;
};
