import { Tile, Player } from '../AppState';
import { PLAYERS_COUNT } from '../constants';
import { getSurroundingTiles } from '../Tile';

interface PlayerGeneratorProps {
    tiles: Tile[];
}

export function generatePlayers({ tiles }: PlayerGeneratorProps) {
    const players: Player[] = [];
    let nextId = 0;

    for (let i = 0; i < PLAYERS_COUNT; i++) {
        const id = nextId++; // TODO
        const firstTile = tiles[Math.random() * tiles.length | 0];
        const around = getSurroundingTiles(tiles, [firstTile]);
        const secondTile = around[Math.random() * around.length | 0];

        players.push({
            id,
            isHuman: true,
            seenTiles: [],
            nation: '',
            towns: [],
            units: [({
                name: 'settler',
                tile: firstTile,
                id: Math.random(),
                ownerId: id,
            }), ({
                name: 'warrior',
                tile: secondTile,
                id: Math.random(),
                ownerId: id,
            })],
        });
    }

    return players;
}