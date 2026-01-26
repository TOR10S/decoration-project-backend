import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar.js";
import createHttpError from 'http-errors';


export function auth(req, res, next) {
 const token = req.cookies.token;

  if (!token) {
    throw createHttpError(401, "not authorized");
  }

  try {
    const decoded = jwt.verify(token, getEnvVar("JWT_SECRET"));
    req.user = decoded;
    next();
  } catch {
    throw createHttpError(401, "token expiered");
  }
}

