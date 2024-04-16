import {User as UserEntities} from "../entities/User";
import User from "../entities/models/user.model";
import {PasswordService} from "./password.service";
import {RegisterUserPayload, UserResponse} from "../entities/types";

export class UserService {
    async findUserByEmail(email: string) {
        return User.findOne({email: email}).populate({
            path: 'pastriesWon',
            model: 'Pastry',
            select: 'image'
        });
    }

    async createUser(payload: RegisterUserPayload) {
        try {
            const hashedPassword = await PasswordService.hash(payload.password);

            const user: UserEntities = {
                email: payload.email,
                password: hashedPassword,
                username: payload.username,
                createdAt: new Date(),
            }

            return User.create(user);
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    async getUserById(userId: string) {
        return User.findById(userId).populate({
            path: 'pastriesWon',
            model: 'Pastry',
            select: 'image'
        });
    }

    async getUsers () {
        return User.find({ pastriesWon: { $ne: [] } }).populate({
            path: 'pastriesWon',
            model: 'Pastry',
            select: 'image'
        });
    }

    buildUserResponse(user: User): UserResponse {
        const pastriesWon = user.pastriesWon as unknown as {_id: string, image: string}[];
        const pastriesSlugs = pastriesWon.map(p => p.image);

        return {
            email: user.email,
            username: user.username,
            nbOfTriesLeft: user.nbOfTriesLeft!,
            pastriesWon: pastriesSlugs
        };
    }
}