import {Router} from "express";
import {createUser, getUsersAndWins, loginUser, resetUserForTest} from "../controllers";

const userRouter = Router();
const AUTH_ROUTE_PREFIX = "/auth";
const USER_ROUTE_PREFIX = "/users";

userRouter.post('/reset/:username', resetUserForTest);
userRouter.post( AUTH_ROUTE_PREFIX + '/register', createUser);
userRouter.post(AUTH_ROUTE_PREFIX + '/login', loginUser);
userRouter.get(USER_ROUTE_PREFIX, getUsersAndWins);

export default userRouter;
