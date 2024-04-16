import {Router} from "express";
import requireAuthMiddleware from "../../middlewares/requireAuth.middleware";
import {getAuthUser} from "../../controllers";

const protectedAuthRouter = Router();
const AUTH_ROUTE_PREFIX = "/auth";

protectedAuthRouter.get(AUTH_ROUTE_PREFIX + "/me", requireAuthMiddleware, getAuthUser);

export default protectedAuthRouter;