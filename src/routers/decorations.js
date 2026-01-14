import { Router } from "express";
import { createDecorationController, deleteDecorationController, getDecorationsController, patchDecorationController, upsertDecorationController } from "../controllers/decorations.js";
import { controllerWrapper } from "../utils/controllerWraper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createDecorationSchema, updateDecorationSchema } from "../validation/decorations.js";
import { isValidDecorationId } from "../middlewares/isValidDecorationId.js";
import { auth } from "../middlewares/authVer.js";
const router = Router();

router.get('/', controllerWrapper(getDecorationsController));
router.post(
  "/",
  auth,
  validateBody(createDecorationSchema),
  controllerWrapper(createDecorationController)
);

router.delete(
  "/:decorationId",
  auth,
  isValidDecorationId,
  controllerWrapper(deleteDecorationController)
);

router.put(
  "/:decorationId",
  auth,
  isValidDecorationId,
  validateBody(updateDecorationSchema),
  controllerWrapper(upsertDecorationController)
);

router.patch(
  "/:decorationId",
  auth,
  isValidDecorationId,
  validateBody(updateDecorationSchema),
  controllerWrapper(patchDecorationController)
);

export default router;
