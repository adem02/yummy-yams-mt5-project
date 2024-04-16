import {NextFunction, Response} from "express";
import {AuthRequest} from "../entities/types";
import {JwtService} from "../services/jwt.service";
import User from "../entities/models/user.model";
import {ApiError} from "../errors";

const requireAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(404, 'Authentication failed. Token missing.');
        }

        const decoded = JwtService.verifyToken(token!);

        if (!decoded) {
                throw new ApiError(401, 'Token not verified.');
        }

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            throw new ApiError(401, 'Authentication failed. User not found.');
        }

        req.userId = user._id.toString();
        req.token = token;
        next();
}

export default requireAuthMiddleware;