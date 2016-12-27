import { MAP_HEIGHT, MAP_WIDTH } from '../constants';

import { Tile } from '../AppState';
import { getRandom } from '../utils';
import { getRandomType } from '../utils';

export function generateTiles(seed: number) {
    const tiles: Tile[] = [];

    for (let i = 1; i < MAP_WIDTH - 1; i++) {
        for (let j = 1; j < MAP_HEIGHT - 1; j++) {
            const id = MAP_HEIGHT * i + j;

            const random = getRandom(seed);
            seed = random.nextSeed;

            tiles[id] = {
                id,
                ownerId: -1,
                type: getRandomType(random.value),
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


    return { tiles, seed };
}
