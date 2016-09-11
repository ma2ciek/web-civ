import { Tile, Camera, Unit, Player } from './AppState';
import { MAP_HEIGHT, MAP_WIDTH, TILE_HEIGH, TILE_WIDTH } from './constants';
import { tileTypes } from './constants';

export function getTilePosition(tileId: number, zoom: number) {
    const tileWidth = zoom * TILE_WIDTH;
    const tileHeight = zoom * TILE_HEIGH;

    const top = tileId % MAP_HEIGHT;
    const left = tileId / MAP_HEIGHT | 0;

    return left % 2 === 0 ? ({
        left: left * tileWidth * 3 / 4,
        top: top * tileHeight,
    }) : ({
        left: left * tileWidth * 3 / 4,
        top: top * tileHeight + tileHeight / 2,
    });
}

export function isTileVisible(tile: Tile, camera: Camera) {
    const tileWidth = camera.zoom * TILE_WIDTH;
    const tileHeight = camera.zoom * TILE_HEIGH;

    const position = getTilePosition(tile.id, camera.zoom);

    const left = position.left - camera.left + window.innerWidth / 2 - tileWidth / 2;
    const top = position.top - camera.top + window.innerHeight / 2 - tileHeight / 2;

    return (
        left < window.innerWidth &&
        top < window.innerHeight &&
        left > -tileWidth &&
        top > -tileHeight
    );
}

export function getSurroundingTiles({ allTiles, tiles }: { allTiles: Tile[], tiles: Tile[] }) {
    const surroundingTiles: Tile[] = [];
    for (const tile of tiles) {
        // TODO - more tiles + filter duplicates.
        surroundingTiles.push(tile);

        surroundingTiles.push(getTileById(allTiles, tile.id - 1));
        surroundingTiles.push(getTileById(allTiles, tile.id + 1));

        if (tile.position.left % 2 === 0) {
            surroundingTiles.push(getTileById(allTiles, tile.id - MAP_HEIGHT - 1));
            surroundingTiles.push(getTileById(allTiles, tile.id + MAP_HEIGHT - 1));
        } else {
            surroundingTiles.push(getTileById(allTiles, tile.id - MAP_HEIGHT + 1));
            surroundingTiles.push(getTileById(allTiles, tile.id + MAP_HEIGHT + 1));
        }

        surroundingTiles.push(getTileById(allTiles, tile.id - MAP_HEIGHT));
        surroundingTiles.push(getTileById(allTiles, tile.id + MAP_HEIGHT));
    }

    return surroundingTiles.filter(x => !!x);
}

export function getAvailableTilesForUnit(unit: Unit, allTiles: Tile[]) {
    const tile = getTileById(allTiles, unit.tileId);
    return _.uniq(getAvailableMoves(tile, allTiles, unit.movementLeft).map(x => x.tile))
        .filter(t => t.id !== unit.tileId);
}

interface TileFinderResult {
    tile: Tile;
    movementLeft: number;
}

export function getAvailableMoves(tile: Tile, allTiles: Tile[], availableMovement: number): TileFinderResult[] {
    // TODO: remove recursion and store data to provide better results

    const tiles = getSurroundingTiles({ tiles: [tile], allTiles })
        .filter(t => tileTypes[t.type].moveCost <= availableMovement && t.id !== tile.id)
        .map(t => ({ tile: t, movementLeft: availableMovement - tileTypes[t.type].moveCost }));

    const surroundingTiles = _.flatten(
        tiles.map(t =>
            getAvailableMoves(t.tile, allTiles, availableMovement - tileTypes[t.tile.type].moveCost))
    );

    return [...tiles, ...surroundingTiles];
}

export function haveTileBeenSeenByPlayer(tile: Tile, player: Player) {
    return player.seenTileIds.indexOf(tile.id) > -1;
}

function getTileById(tiles: Tile[], id: number) {
    return tiles.filter(t => t.id === id)[0];
}

export function getMovementLeft(tile1: Tile, tile2: Tile, availableTiles: Tile[], maxDistance: number) {
    const r = getAvailableMoves(tile1, availableTiles, maxDistance); // TODO;

    const res = r.filter(x => x.tile === tile2);

    if (res.length === 0)
        return -1;

    return res[0].movementLeft;
}