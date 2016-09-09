import { Tile } from '../AppState';

interface TileGeneratorProps {
    height: number;
    width: number;
}

enum TileTypes {
    Water,
    Grass,
    Desert
}

export function generateTiles({ width, height }: TileGeneratorProps) {
    const tiles: Tile[] = [];
    let nextId = 0;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            tiles.push({
                position: {
                    x: i,
                    y: j,
                },
                id: nextId++,
                owner: null,
                type: '',
            });
        }
    }

    return tiles;
}