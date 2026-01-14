import { loginService } from "../services/auth.js";

export const loginController = async (req, res) => {
  const token = await loginService(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Login successful" });
};

export const logoutController = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
