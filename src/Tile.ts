import { Tile, Camera } from './AppState';

export const TILE_HEIGHT = 100 * Math.sqrt(3) / 2;
export const TILE_WIDTH = 100;

export function getTilePosition(tile: Tile) {
    return tile.position.x % 2 == 0 ? ({
        left: tile.position.x * TILE_WIDTH * 3 / 4,
        top: tile.position.y * TILE_HEIGHT,
    }) : ({
        left: tile.position.x * TILE_WIDTH * 3 / 4,
        top: tile.position.y * TILE_HEIGHT + TILE_HEIGHT / 2,
    });
}

export function isTileVisible(tile: Tile, camera: Camera) {
    const position = getTilePosition(tile);

    const left = position.left - camera.x + window.innerWidth / 2 - TILE_WIDTH / 2;
    const top = position.top - camera.y + window.innerHeight / 2 - TILE_HEIGHT / 2;

    return (
        left < window.innerWidth &&
        top < window.innerHeight &&
        left > -TILE_WIDTH &&
        top > -TILE_HEIGHT
    );
}

export function getSurroundingTiles(allTiles: Tile[], tiles: Tile[], mapWidth: number, mapHeight: number) {
    const surroundingTiles: Tile[] = [];
    for (const tile of tiles) {
        // TODO - more tiles + filter duplicates.
        surroundingTiles.push(tile);
        surroundingTiles.push(allTiles[tile.id - 1]);
        surroundingTiles.push(allTiles[tile.id + 1]);

        surroundingTiles.push(allTiles[tile.id - mapHeight]);
        surroundingTiles.push(allTiles[tile.id + mapHeight]);

        if (tile.position.x % 2 == 0) {
            surroundingTiles.push(allTiles[tile.id - mapHeight - 1]);
            surroundingTiles.push(allTiles[tile.id + mapHeight - 1]);
        } else {
            surroundingTiles.push(allTiles[tile.id - mapHeight + 1]);
            surroundingTiles.push(allTiles[tile.id + mapHeight + 1]);
        }
    }

    return surroundingTiles.filter(x => !!x);
}