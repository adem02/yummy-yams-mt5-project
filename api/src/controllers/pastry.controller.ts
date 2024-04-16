import {Request, Response} from 'express';
import Pastry from "../entities/models/pastry.model";

export async function getPastriesCount(req: Request, res: Response) {
    const pastries = (await Pastry.find()) as Pastry[];

    let count = 0;

    pastries.forEach(p => {
        count = count+p.stock;
    })

    return res.status(200).send({
        count
    });
}

