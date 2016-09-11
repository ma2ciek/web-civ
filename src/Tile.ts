import { Tile, Camera } from './AppState';
import { MAP_HEIGHT, TILE_HEIGH, TILE_WIDTH } from './constants';

export function getTilePosition(tile: Tile, zoom: number) {
    const tileWidth = zoom * TILE_WIDTH;
    const tileHeight = zoom * TILE_HEIGH;

    return tile.position.left % 2 === 0 ? ({
        left: tile.position.left * tileWidth * 3 / 4,
        top: tile.position.top * tileHeight,
    }) : ({
        left: tile.position.left * tileWidth * 3 / 4,
        top: tile.position.top * tileHeight + tileHeight / 2,
    });
}

export function isTileVisible(tile: Tile, camera: Camera) {
    const tileWidth = camera.zoom * TILE_WIDTH;
    const tileHeight = camera.zoom * TILE_HEIGH;

    const position = getTilePosition(tile, camera.zoom);

    const left = position.left - camera.left + window.innerWidth / 2 - tileWidth / 2;
    const top = position.top - camera.top + window.innerHeight / 2 - tileHeight / 2;

    return (
        left < window.innerWidth &&
        top < window.innerHeight &&
        left > -tileWidth &&
        top > -tileHeight
    );
}

export function getSurroundingTiles(allTiles: Tile[], tiles: Tile[]) {
    const surroundingTiles: Tile[] = [];
    for (const tile of tiles) {
        // TODO - more tiles + filter duplicates.
        surroundingTiles.push(tile);
        surroundingTiles.push(allTiles[tile.id - 1]);
        surroundingTiles.push(allTiles[tile.id + 1]);

        surroundingTiles.push(allTiles[tile.id - MAP_HEIGHT]);
        surroundingTiles.push(allTiles[tile.id + MAP_HEIGHT]);

        if (tile.position.left % 2 === 0) {
            surroundingTiles.push(allTiles[tile.id - MAP_HEIGHT - 1]);
            surroundingTiles.push(allTiles[tile.id + MAP_HEIGHT - 1]);
        } else {
            surroundingTiles.push(allTiles[tile.id - MAP_HEIGHT + 1]);
            surroundingTiles.push(allTiles[tile.id + MAP_HEIGHT + 1]);
        }
    }

    return surroundingTiles.filter(x => !!x);
}
