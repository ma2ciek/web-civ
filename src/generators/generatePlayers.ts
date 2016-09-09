import { Tile, Player } from '../AppState';

interface PlayerGeneratorProps {
    tiles: Tile[];
    playersAmount: number;
}

export function generatePlayers({ tiles, playersAmount }: PlayerGeneratorProps) {
    const players: Player[] = [];
    let nextId  = 0;

    for (let i = 0; i < playersAmount; i++) {
        players.push({
            id: nextId++,
            isHuman: true,
            seenTiles: [],
            nation: '',
            units: [{
                name: 'settler',
                tile: tiles[Math.random() * tiles.length | 0],
            }],
        });
    }

    return players;
}