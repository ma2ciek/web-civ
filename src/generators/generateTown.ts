import { Town } from '../AppState';
import { getUnique } from '../utils';

interface GenerateTownOutput {
    town: Town;
    nextSeed: number;
}

interface GenerateTownInput {
    tileId: number;
    playerId: number;
    seed: number;
}

export function generateTown(input: GenerateTownInput): GenerateTownOutput {
    const unique = getUnique(input.seed);
    return {
        town: {
            tileId: input.tileId,
            ownerId: input.playerId,
            id: unique.value,
            name: 'Unnamed town', // TODO: Town #count
            buildings: []
        },
        nextSeed: unique.nextSeed,
    };
}

