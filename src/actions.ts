import { createAction } from 'redux-actions';
import { Unit, Position } from './AppState';

export const GENERATE_MAP = 'GENERATE_MAP';
export const GENERATE_PLAYERS = 'GENERATE_PLAYERS';
export const MOVE_CAMERA = 'MOVE_CAMERA';
export const NEXT_TURN = 'NEXT_TURN';
export const MAYBE_MOVE_BY = 'MAYBE_MOVE_BY';

export const generateMap = createAction(GENERATE_MAP);
export const generatePlayers = createAction(GENERATE_PLAYERS);
export const moveCamera = createAction<Position>(
    MOVE_CAMERA,
    ({ left, top }) => ({ left, top })
);

export const nextTurn = createAction(NEXT_TURN);
export const maybeMoveCurrentUnit = createAction(MAYBE_MOVE_BY, tile => ({ tile }));


export const CREATE_CITY = 'CREATE_CITY';
export const createCity = createAction(CREATE_CITY);

export const SELECT_UNIT = 'SELECT_UNIT';
export const selectUnit = createAction(SELECT_UNIT, (unit: Unit) => unit);