import { Tile, Player } from '../AppState';
import { PLAYERS_COUNT } from '../constants';
import { getSurroundingTileIds } from '../utils';
import * as intersection from 'lodash/intersection';
import { v4 }  from 'node-uuid';

interface PlayerGeneratorProps {
    allTiles: Tile[];
}

export function generatePlayers({ allTiles }: PlayerGeneratorProps) {
    const players: Player[] = [];
    let nextId = 0;

    const nonWaterTiles = allTiles.filter(tile => tile.type !== 'water');

    for (let i = 0; i < PLAYERS_COUNT; i++) {
        const id = nextId++; // TODO
        const firstTile = nonWaterTiles[Math.random() * nonWaterTiles.length | 0];
        const surroundingTileIds = getSurroundingTileIds([firstTile.id]);

        const around = intersection(
            surroundingTileIds.map(id => allTiles[id]),
            nonWaterTiles
        )
            .filter(t => t.id !== firstTile.id);

        const secondTile = around[Math.random() * around.length | 0];

        players.push({
            id,
            isHuman: true,
            seenTileIds: [],
            nation: '',
            towns: [],
            units: [({
                name: 'settler',
                tileId: firstTile.id,
                id: v4(),
                ownerId: id,
                movement: 2,
                movementLeft: 2,
                hp: 10,
                hpLeft: 10,
            }), ({
                name: 'warrior',
                tileId: secondTile.id,
                id: v4(),
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

    return players;
}