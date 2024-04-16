import {Document, model, Schema} from "mongoose";
import {User} from "../User";

export interface IUser extends User, Document {}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nbOfTriesLeft: {
        type: Number,
        required: true,
        max: 15,
        default: 3,
        min: 0
    },
    pastriesWon: [{
        type: Schema.Types.ObjectId,
        ref: "Pastry",
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const User = model<IUser>("User", userSchema);

export default User;