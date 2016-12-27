import { Position, Tile, Town, Unit, ZoomEvent } from './AppState';

import { createAction } from 'redux-actions';

export const NEXT_TURN = 'NEXT_TURN';
export const nextTurn = createAction(NEXT_TURN);

export const MAYBE_MOVE_BY = 'MAYBE_MOVE_BY';
export const maybeMoveCurrentUnit = createAction(MAYBE_MOVE_BY, (tile: Tile) => tile.id);

export const MELEE_ATTACK = 'MELEE_ATTACK';
export const meleeAttack = createAction<Unit>(MELEE_ATTACK, (enemyId: Unit) => enemyId);

export const DISTANCE_ATTACK = 'DISTANCE_ATTACK';
export const distanceAttack = createAction<Unit>(DISTANCE_ATTACK, (enemyId: Unit) => enemyId);

export const GENERATE_PLAYERS = 'GENERATE_PLAYERS';
export const generatePlayers = createAction(GENERATE_PLAYERS)

export const GENERATE_TILES = 'GENERATE_TILES';
export const generateTiles = createAction(GENERATE_TILES);

export const MOVE_CAMERA = 'MOVE_CAMERA';
export const moveCamera = createAction<Position>(MOVE_CAMERA, pos => pos);

export const CREATE_CITY = 'CREATE_CITY';
export const createCity = createAction(CREATE_CITY);

export const DESELECT = 'DESELECT';
export const deselect = createAction(DESELECT);

export const SELECT_UNIT = 'SELECT_UNIT';
export const selectUnit = createAction<Unit>(SELECT_UNIT, (unit: Unit) => unit);

export const SELECT_TOWN = 'SELECT_TOWN';
export const selectTown = createAction(SELECT_TOWN, (town: Town) => town);

export const ZOOM_MAP = 'ZOOM_MAP';
export const zoomMap = createAction(ZOOM_MAP, (zoom: ZoomEvent) => zoom);

export const NEXT_SELECTION = 'NEXT_SELECTION';
export const nextSelection = createAction(NEXT_SELECTION);

export const HOVER_TILE = 'HOVER_TILE';
export const hoverTile = createAction<number>(HOVER_TILE);
