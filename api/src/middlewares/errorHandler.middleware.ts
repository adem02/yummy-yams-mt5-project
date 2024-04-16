import {ApiError} from "../errors";
import {Request, Response, NextFunction} from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).send({error: err.message});
    }

    return res.status(500).send({error: 'Something went wrong'});
}

export default errorHandler;
