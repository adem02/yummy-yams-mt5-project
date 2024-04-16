import {Document, model, Schema} from "mongoose";
import {Pastry} from "../Pastry";

export interface IPastry extends Pastry, Document {}

const pastrySchema: Schema = new Schema({
    name: String,
    image: String,
    stock: Number,
    quantityWon: Number,
});

const Pastry = model<IPastry>("Pastry", pastrySchema);

export default Pastry;