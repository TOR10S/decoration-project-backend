import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar.js";

export function auth(req, res, next) {
 const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Не авторизований" });
  }

  try {
    const decoded = jwt.verify(token, getEnvVar("JWT_SECRET"));
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Токен недійсний" });
  }
}
