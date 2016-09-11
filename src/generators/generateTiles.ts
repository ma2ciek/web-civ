import { Tile } from '../AppState';
import { MAP_WIDTH, MAP_HEIGHT } from '../constants';
import { getRandomType } from '../utils';

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
                type: getRandomType(),
            });
        }
    }

    return tiles;
}