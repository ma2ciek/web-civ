import { Player, Tile } from '../AppState';
import { getRandoms, getSurroundingTileIds, getUniques } from '../utils';

import { PLAYERS_COUNT } from '../constants';
import { intersection } from 'lodash';

interface PlayerGeneratorProps {
    allTiles: Tile[];
    seed: number;
}

export function generatePlayers({ allTiles, seed }: PlayerGeneratorProps) {
    const players: Player[] = [];
    let nextId = 0;

    const nonWaterTiles = allTiles.filter(tile => tile.type !== 'water');

    const uniques = getUniques(2 * PLAYERS_COUNT, seed);
    const randoms = getRandoms(2 * PLAYERS_COUNT, uniques.nextSeed);

    for (let i = 0; i < PLAYERS_COUNT; i++) {
        const id = nextId++; // TODO
        const firstTile = nonWaterTiles[randoms.values[i * 2] * nonWaterTiles.length | 0];
        const surroundingTileIds = getSurroundingTileIds([firstTile.id]);

        const around = intersection(
            surroundingTileIds.map(id => allTiles[id]),
            nonWaterTiles
        )
            .filter(t => t.id !== firstTile.id);

        const secondTile = around[randoms.values[i * 2 + 1] * around.length | 0];


        players.push({
            id,
            isHuman: true,
            seenTileIds: [],
            nation: '',
            towns: [],
            units: [({
                name: 'settler',
                tileId: firstTile.id,
                id: uniques.values[i * 2],
                ownerId: id,
                movement: 2,
                movementLeft: 2,
                hp: 10,
                hpLeft: 10,
            }), ({
                name: 'warrior',
                tileId: secondTile.id,
                id: uniques.values[i * 2 + 1],
                ownerId: id,
                movement: 3,
                movementLeft: 3,
                hp: 20,
                hpLeft: 20,
                meleeDamage: 5,
                experience: 0,
            })],
        });
    }

    return { players, nextSeed: randoms.nextSeed };
}