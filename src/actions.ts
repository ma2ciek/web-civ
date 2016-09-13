import { createAction } from 'redux-actions';
import { Unit, Position, Town, Tile } from './AppState';

export const GENERATE_PLAYERS = 'GENERATE_PLAYERS';
export const MOVE_CAMERA = 'MOVE_CAMERA';
export const NEXT_TURN = 'NEXT_TURN';
export const MAYBE_MOVE_BY = 'MAYBE_MOVE_BY';

export const generatePlayers = createAction(GENERATE_PLAYERS);
export const moveCamera = createAction<Position>(
    MOVE_CAMERA,
    ({ left, top }) => ({ left, top })
);

export const nextTurn = createAction(NEXT_TURN);
export const maybeMoveCurrentUnit = createAction(MAYBE_MOVE_BY, (tile: Tile) => ({ tileId: tile.id }));

export const CREATE_CITY = 'CREATE_CITY';
export const createCity = createAction(CREATE_CITY);

export const DESELECT = 'DESELECT';
export const deselect = createAction(DESELECT);

export const SELECT_UNIT = 'SELECT_UNIT';
export const selectUnit = createAction(SELECT_UNIT, (unit: Unit) => unit);

export const SELECT_TOWN = 'SELECT_TOWN';
export const selectTown = createAction(SELECT_TOWN, (town: Town) => town);

export const ZOOM_MAP = 'ZOOM_MAP';
export const zoomMap = createAction(ZOOM_MAP, (delta: number) => delta);

export const NEXT_SELECTION = 'NEXT_SELECTION';
export const nextSelection = createAction(NEXT_SELECTION);