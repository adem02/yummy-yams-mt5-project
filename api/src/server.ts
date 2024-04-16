import express, {json} from 'express';
import 'express-async-errors';
import cors from "cors";
import appRouter from "./routers";
import {DBConfig} from "./config/DBConfig";
import errorHandler from "./middlewares/errorHandler.middleware";
import {ApiError} from "./errors";
import 'dotenv/config';
import path from "node:path";
import fs from "node:fs";
import Pastry from "./entities/models/pastry.model";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(json());

app.use(appRouter);

app.all('*', async (req, res) => {
    throw new ApiError(404, "Route Not Found");
});

app.use(errorHandler);

app.listen(PORT, async () => {
    await (new DBConfig()).connect();
    const pastries = await Pastry.find();
    if (pastries.length === 0) {
        const filePath = path.join(__dirname, 'data', 'pastries.json');
        const jsonData = fs.readFileSync(filePath, { encoding: 'utf8' });
        const pastries = JSON.parse(jsonData);

        await Pastry.insertMany(pastries);
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});