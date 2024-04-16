import {Router} from "express";
import {getPastriesCount} from "../controllers/pastry.controller";

const pastryRouter = Router();
const AUTH_ROUTE_PREFIX = "/pastry";

pastryRouter.get(AUTH_ROUTE_PREFIX, getPastriesCount);

export default pastryRouter;