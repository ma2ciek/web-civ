import { Tile } from '../AppState';
import { MAP_WIDTH, MAP_HEIGHT } from '../constants';
import { getRandomType } from '../utils';

const tileTypeChances = [
    { type: 'grass', chance: 5 },
    { type: 'forest', chance: 2 },
    { type: 'water', chance: 1 },
];

export function generateTiles() {
    const tiles: Tile[] = [];
    let nextId = 0;

    for (let i = 0; i < MAP_WIDTH; i++) {
        for (let j = 0; j < MAP_HEIGHT; j++) {
            tiles.push({
                position: {
                    left: i,
                    top: j,
                },
                id: nextId++,
                ownerId: -1,
                type: getRandomType(tileTypeChances),
            });
        }
    }

    return tiles;
}