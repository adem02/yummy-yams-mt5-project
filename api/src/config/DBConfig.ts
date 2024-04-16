import * as mongoose from "mongoose";
import * as process from "node:process";

export class DBConfig {
    constructor(private readonly uri: string = "mongodb+srv://adem02:mt5-yummy@yams.o0umqkk.mongodb.net/?retryWrites=true&w=majority&appName=yams") {}

    async connect() {
        try {
            await mongoose.connect(process.env.DB_URI || this.uri, {
                dbName: 'yummy'
            });
            console.log("Connexion à la base de données MongoDB réussie !");
        } catch (err) {
            console.error("Erreur lors de la connexion à la base de données MongoDB :", err);
        }
    }
}