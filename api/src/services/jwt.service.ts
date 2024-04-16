import jwt, {JwtPayload} from "jsonwebtoken";
import {ApiError} from "../errors";
const jwtSecret = process.env.JWT_SECRET || 'yummy-project-mt5-DEM-Ah';

export class JwtService {
    static signUser(payload: any) {
        return jwt.sign(payload, jwtSecret, {
            expiresIn: "1h"
        })
    }

    static verifyToken(token: string): any {
        let user: {email: string, password: string}|null = null;
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                throw new ApiError(401, 'Token not Verified');
            } else {
                decoded = decoded as JwtPayload;
                user = {
                    email: decoded.email,
                    password: decoded!.password
                };
            }
        })

        return user;
    }
}