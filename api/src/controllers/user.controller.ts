import { Request, Response } from 'express';
import {UserService} from "../services/user.service";
import {JwtService} from "../services/jwt.service";
import {AuthRequest, LoginUserPayload, RegisterUserPayload, UserResponse} from "../entities/types";
import {PasswordService} from "../services/password.service";
import {ApiError} from "../errors";
import User from "../entities/models/user.model";

export const createUser = async(req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const userService = new UserService();

    const existantUser = await userService.findUserByEmail(email);

    if (existantUser !== null) {
        return res.status(400).json("User already exists");
    }

    const userPayload: RegisterUserPayload = {email, password, username};

    const user = await userService.createUser(userPayload);

    const token = JwtService.signUser(req.body as RegisterUserPayload);

    return res.status(201).json({
        token,
        user: userService.buildUserResponse(user)
    });
}

export const loginUser = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    const userService = new UserService();

    const userPayload: LoginUserPayload = {email, password};

    const user = (await userService.findUserByEmail(email)) as User;

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    const isPasswordCorrect = await PasswordService.check(userPayload.password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Password");
    }

    const token = JwtService.signUser(req.body as LoginUserPayload);

    res.status(201).send({
        token,
        user: userService.buildUserResponse(user)
    });
}

export const getAuthUser = async(req: AuthRequest, res: Response) => {
    const userService = new UserService();
    const userId = req.userId!;

    const authUser = (await userService.getUserById(userId)) as User;

    if (!authUser) {
        throw new ApiError(403, "User not found");
    }

    return res.status(200).send({
        user: userService.buildUserResponse(authUser)
    })
}

export const resetUserForTest = async (req: Request, res: Response) => {
     const {username} = req.params;

     const updatedData = {
         nbOfTriesLeft: 3,
         pastriesWon: []
     }

     const updatedUser = await User.findOneAndUpdate({username}, {$set: updatedData}, {new: true});

     if (!updatedUser) {
         throw new ApiError(403, 'Error updating user');
     }

     res.status(204).send({});
}

export const getUsersAndWins = async (req: Request, res: Response) => {
    const userService = new UserService();

    const users = await userService.getUsers() as User[];

    const usersResponse = users.map(user => {
        return userService.buildUserResponse(user);
    })

    res.status(200).send({users: usersResponse});
}