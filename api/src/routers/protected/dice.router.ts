import {Router} from "express";
import {throwDices} from "../../controllers";
import requireAuthMiddleware from "../../middlewares/requireAuth.middleware";

const diceRouter = Router();
const DICE_ROUTE_PREFIX = "/dice";

diceRouter.post(DICE_ROUTE_PREFIX, requireAuthMiddleware, throwDices);

export default diceRouter;