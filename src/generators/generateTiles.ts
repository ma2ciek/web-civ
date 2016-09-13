import { Tile } from '../AppState';
import { MAP_WIDTH, MAP_HEIGHT } from '../constants';
import { getRandomType } from '../utils';

export function generateTiles() {
    const tiles: Tile[] = [];

    for (let i = 1; i < MAP_WIDTH - 1; i++) {
        for (let j = 1; j < MAP_HEIGHT - 1; j++) {
            const id = MAP_HEIGHT * i + j;

            tiles[id] = {
                id,
                ownerId: -1,
                type: getRandomType(),
            };
        }
    }

    for (let i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++) {
        tiles[i] = tiles[i] || {
            id: i,
            ownerId: -1,
            type: 'water',
        };
    }


    return tiles;
}
