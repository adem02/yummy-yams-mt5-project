import {PastriesWon} from "../entities/types";
import Pastry from "../entities/models/pastry.model";
import {ApiError} from "../errors";

export class DiceService {
    constructor(private readonly faces: number = 5) {}

    public rollDices() {
        const min: number = 1, max: number = 5;

        const rolledDice: number[] = [];

        for (let i = 0; i < this.faces; i++) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            rolledDice.push(randomNumber);
        }
        return rolledDice;
    }

    private analyseRolledDices(dices: number[]) {
        const frequency: Record<number, number> = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

        dices.forEach((dice) => frequency[dice]++);

        const counts = Object.values(frequency);

        if (counts.includes(5)) {
            return 3;
        } else if (counts.includes(4)) {
            return 2;
        } else {
            const pairs = counts.filter(c => c === 2).length;
            if (pairs === 2) {
                return 1;
            }
        }

        return 0;
    }

    public async getPastriesWonByRolledDices(rolledDices: number[]): Promise<PastriesWon[]> {
        let result: PastriesWon[] = [];

        const quantity = this.analyseRolledDices(rolledDices);

        const availablePastries = await Pastry.find({stock: {$gt: 0}});

        for (let i = 0; i < quantity; i++) {
            if (availablePastries.length === 0) {
                throw new ApiError(403, 'Not enough stock for more pastries.');
            }
            let randomIndex = Math.floor(Math.random() * availablePastries.length);
            let selectedPastry = availablePastries[randomIndex];

            const pastrySlug = selectedPastry.image.split('.')[0];

            result.push({
                id: selectedPastry._id,
                slug: pastrySlug,
            });
            selectedPastry.stock--;
            selectedPastry.quantityWon++;

            await selectedPastry.save();
        }

        return result;
    }
}