import { Tile, Player } from '../AppState';
import { PLAYERS_COUNT } from '../constants';
import { getSurroundingTiles } from '../tile-utils';

interface PlayerGeneratorProps {
    allTiles: Tile[];
}

export function generatePlayers({ allTiles }: PlayerGeneratorProps) {
    const players: Player[] = [];
    let nextId = 0;

    for (let i = 0; i < PLAYERS_COUNT; i++) {
        const id = nextId++; // TODO
        const firstTile = allTiles[Math.random() * allTiles.length | 0];

        const around = getSurroundingTiles({ allTiles, tiles: [firstTile] })
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
                id: Math.random(),
                ownerId: id,
                movement: 2,
                movementLeft: 2,
            }), ({
                name: 'warrior',
                tileId: secondTile.id,
                id: Math.random(),
                ownerId: id,
                movement: 3,
                movementLeft: 3,
            })],
        });
    }

    return players;
}