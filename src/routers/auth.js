import { Router } from "express";
import { controllerWrapper } from "../utils/controllerWraper.js";
import { loginController, logoutController } from "../controllers/auth.js";


const router = Router();
router.post('/login',controllerWrapper(loginController) );
router.post('/logout',controllerWrapper(logoutController) );
export default router;
