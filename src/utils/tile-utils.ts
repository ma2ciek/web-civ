import { Tile, Camera, Unit, Player } from '../AppState';
import { MAP_HEIGHT, MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from '../constants';
import { tileTypes } from '../constants';
import { uniq, flatten } from 'lodash';

export function getTileCameraPosition(tileId: number, zoom: number) {
    const tileWidth = zoom * TILE_WIDTH;
    const tileHeight = zoom * TILE_HEIGHT;

    const position = getTilePositionById(tileId);

    return position.left % 2 === 0 ? ({
        left: position.left * tileWidth * 3 / 4,
        top: position.top * tileHeight,
    }) : ({
        left: position.left * tileWidth * 3 / 4,
        top: position.top * tileHeight + tileHeight / 2,
    });
}

export function isTileVisible(tile: Tile, camera: Camera) {
    const tileWidth = camera.zoom * TILE_WIDTH;
    const tileHeight = camera.zoom * TILE_HEIGHT;

    const position = getTileCameraPosition(tile.id, camera.zoom);

    const left = position.left - camera.left + window.innerWidth / 2 - tileWidth / 2;
    const top = position.top - camera.top + window.innerHeight / 2 - tileHeight / 2;

    return (
        left < window.innerWidth &&
        top < window.innerHeight &&
        left > -tileWidth &&
        top > -tileHeight
    );
}

export function getSurroundingTileIds(tileIds: number[]) {
    const surroundingTileIds: number[] = [];
    for (const id of tileIds) {
        const position = getTilePositionById(id);

        // TODO - Remove id.
        surroundingTileIds.push(id);

        surroundingTileIds.push(id - 1);
        surroundingTileIds.push(id + 1);

        if (position.left % 2 === 0) {
            surroundingTileIds.push(id - MAP_HEIGHT - 1);
            surroundingTileIds.push(id + MAP_HEIGHT - 1);
        } else {
            surroundingTileIds.push(id - MAP_HEIGHT + 1);
            surroundingTileIds.push(id + MAP_HEIGHT + 1);
        }

        surroundingTileIds.push(id - MAP_HEIGHT);
        surroundingTileIds.push(id + MAP_HEIGHT);
    }

    return uniq(surroundingTileIds.filter(x => x >= 0 && x < MAP_WIDTH * MAP_HEIGHT));
}

export function getAvailableTilesForUnit(unit: Unit, allTiles: Tile[]) {
    const tile = getTileById(allTiles, unit.tileId);
    return uniq(getAvailableMoves(tile, allTiles, unit.movementLeft).map(x => x.tile))
        .filter(t => t.id !== unit.tileId);
}

interface TileFinderResult {
    tile: Tile;
    movementLeft: number;
}

export function getAvailableMoves(tile: Tile, allTiles: Tile[], availableMovement: number): TileFinderResult[] {
    // TODO: remove recursion and store data to provide better results

    const movementMap = getSurroundingTileIds([tile.id])
        .map(id => getTileById(allTiles, id))
        .filter(t => !!t)
        .filter(t => tileTypes[t.type].moveCost <= availableMovement)
        .filter(t => t.id !== tile.id)
        .map(t => ({
            tile: t,
            movementLeft: availableMovement - tileTypes[t.type].moveCost,
        }));

    const surroundingTiles = flatten(
        movementMap.map(t =>
            getAvailableMoves(t.tile, allTiles, availableMovement - tileTypes[t.tile.type].moveCost))
    );

    return [...movementMap, ...surroundingTiles];
}

export function haveTileBeenSeenByPlayer(tile: Tile, player: Player) {
    return player.seenTileIds.indexOf(tile.id) > -1;
}

export function getTileById(tiles: Tile[], id: number) {
    return tiles.filter(t => t.id === id)[0];
}

export function getMovementLeft(tile1: Tile, tile2: Tile, availableTiles: Tile[], maxDistance: number) {
    const r = getAvailableMoves(tile1, availableTiles, maxDistance); // TODO;

    const res = r.filter(x => x.tile === tile2);

    if (res.length === 0)
        return -1;

    return res[0].movementLeft;
}

export function getTilePositionById(id: number) {
    return {
        left: id / MAP_WIDTH | 0,
        top: id % MAP_WIDTH,
    };
}

export function getTileIndexFromCameraPoint(camera: Camera) {
    const tileWidth = camera.zoom * TILE_WIDTH;
    const tileHeight = camera.zoom * TILE_HEIGHT;

    const fromLeft = camera.left / tileWidth * 3 / 4 | 0;
    const fromTop = camera.top / tileHeight | 0;

    return fromLeft * MAP_HEIGHT + fromTop;
}