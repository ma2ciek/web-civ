import { tileTypes } from './constants';

export function getRandomType() {
    const tileNames = Object.keys(tileTypes);

    const multiplier = 1 / tileNames.map(t => tileTypes[t].chance).reduce((sum, x) => sum + x, 0);

    let random = Math.random();

    for (const t of tileNames) {
        if (random < tileTypes[t].chance * multiplier)
            return t;

        random -= tileTypes[t].chance * multiplier;
    }
}
