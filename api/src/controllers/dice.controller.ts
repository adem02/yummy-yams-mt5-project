import {Response} from "express";
import {AuthRequest, UserResponse} from "../entities/types";
import {ApiError} from "../errors";
import User from "../entities/models/user.model";
import {DiceService} from "../services/dice.service";
import {UserService} from "../services/user.service";

export async function throwDices(req: AuthRequest, res: Response) {
    const authUserId = req.userId!;
    const diceService = new DiceService();
    const userService = new UserService();

    const user = await userService.getUserById(authUserId);

    if(!user) {
        throw new ApiError(403, 'User not found.');
    }

    if (user.nbOfTriesLeft === 0) {
        throw new ApiError(403, "You are not allowed to play anymore.");
    }

    user.nbOfTriesLeft!-=1;

    const shuffledDice = diceService.rollDices();

    const pastriesWon = await diceService.getPastriesWonByRolledDices(shuffledDice);

    if (pastriesWon.length > 0) {
        user.nbOfTriesLeft = 0;

        user.pastriesWon!.push(...pastriesWon.map(p => p.id.toString()));
    }

    await user.save();

    const userWithPastriesWon = await userService.getUserById(authUserId);

    return res.status(201).send({
        dices: shuffledDice,
        user: userService.buildUserResponse(userWithPastriesWon!)
    });
}