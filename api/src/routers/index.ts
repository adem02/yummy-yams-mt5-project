import {Router} from "express";
import userRouter from "./user.router";
import diceRouter from "./protected/dice.router";
import protectedAuthRouter from "./protected/user.router";
import pastryRouter from "./pastry.router";

const appRouter = Router();
const API_PREFIX = '/api';

appRouter
    .use(API_PREFIX, userRouter)
    .use(API_PREFIX, diceRouter)
    .use(API_PREFIX, pastryRouter)
    .use(API_PREFIX, protectedAuthRouter);

export default appRouter;