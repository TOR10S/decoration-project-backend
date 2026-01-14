import { Router } from 'express';
import decorationsRouter from './decorations.js';
import authRouter from "./auth.js";
const router = Router();


router.use('/decorations', decorationsRouter);
router.use('/auth', authRouter);

export default router;
