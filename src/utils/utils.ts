import { Position } from '../AppState';
import { tileTypes } from '../constants';

export function getRandomType(random: number) {
    const tileNames = Object.keys(tileTypes);

    const multiplier = 1 / tileNames.map(t => tileTypes[t].chance).reduce((sum, x) => sum + x, 0);

    for (const t of tileNames) {
        if (random < tileTypes[t].chance * multiplier)
            return t;

        random -= tileTypes[t].chance * multiplier;
    }
    throw new Error('missing type');
}

export function merge<X extends Y, Y>(x: X, y: Y): X {
    return Object.assign({}, x, y);
}

export function createCssTransformMatrix(translation: Position, scale = 1) {
    return `matrix(${scale},0,0,${scale},${translation.left},${translation.top})`;
}

export function toUpperCaseFirstLetter(name: string) {
    return name[0].toUpperCase() + name.slice(1);
}